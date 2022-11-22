import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verifyNumberIsUndefinedOrNaN } from 'src/utils/verifyNumberIsUndefinedOrNaN';
import { verifyStringIsEmpty } from 'src/utils/verifyStringIsEmpty';
import { Repository } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { MoviesService } from '../movies/movies.service';
import { Status } from '../status/status.entity';
import { StatusService } from '../status/status.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ICreateUserMovie, IFilterUserMovie, IUpdateUserMovie, IUserMovieBadRequestError } from './interfaces/user-movie';
import { UserMovie } from './user-movie.entity';

@Injectable()
export class UsersMoviesService {
    constructor(
        @InjectRepository(UserMovie) private userMovieRepository: Repository<UserMovie>,
        private userService: UsersService,
        private movieService: MoviesService,
        private statusService: StatusService,
    ) { }

    async createUserMovie(createUserMovie: ICreateUserMovie, reqUser: Partial<User>) {

        if (verifyNumberIsUndefinedOrNaN(Number(createUserMovie.movieId))) {
            return { message: "Informe o Id do filme.", property: "movieId" }
        }

        if (verifyNumberIsUndefinedOrNaN(Number(createUserMovie.statusId))) {
            return { message: "Informe o Id do status.", property: "statusId" }
        }

        if (!verifyStringIsEmpty(createUserMovie.grade)) {
            if (Number(createUserMovie.grade) < 0 || Number(createUserMovie.grade) > 10) {
                return { message: "Informe uma nota válida (de 0 a 10)", property: "grade" }
            }
            createUserMovie.grade = Number(createUserMovie.grade).toFixed();
        }

        const reqMovie: Partial<Movie> = { id: Number(createUserMovie.movieId) }
        const movie = await this.movieService.getMovieById(reqMovie);
        if (!movie) {
            return { message: "O filme não foi encontrado.", property: "movieId" }
        }

        const userMovie = await this.userMovieRepository.findOne({
            where: {
                user: { id: reqUser.id },
                movie: { id: movie.id }
            }
        });
        if (userMovie) {
            return { message: `Já existe uma relação do usuário '${reqUser.name}' com o filme '${movie.name}'. Caso queira editar as informações dessa relação, atualize ela em vez de cria outra.`, property: "movieId" }
        }

        const reqStatus: Partial<Status> = { id: Number(createUserMovie.statusId) }
        const status = await this.statusService.getStatusById(reqStatus);
        if (!status) {
            return { message: "O status não foi encontrado.", property: "statusId" }
        }

        const newUserMovie = this.userMovieRepository.create({
            user: reqUser,
            movie: createUserMovie.movieId,
            status: createUserMovie.statusId,
            grade: createUserMovie.grade,
            comment: createUserMovie.comment
        });
        await this.userMovieRepository.save(newUserMovie);
        return `A relação do usuário '${reqUser.name}' com o filme '${movie.name}' foi adicionada. Status: '${status.description}'; Nota: '${newUserMovie.grade}'; Comentário: '${newUserMovie.comment}'`;
    }

    async updateUserMovie(updateUserMovie: IUpdateUserMovie) {
        if (updateUserMovie.userMovieId === undefined) {
            return {
                message: "Informe o ID da relação que deseja editar.",
                property: "userMovieId"
            }
        }

        const userMovie = await this.userMovieRepository.findOneBy({ id: updateUserMovie.userMovieId });
        if (!userMovie) {
            return {
                message: "A relação não foi encontrada",
                property: "userMovieId"
            }
        }


        const updatedUserMovie = this.userMovieRepository.create(userMovie);
        if (!verifyStringIsEmpty(updateUserMovie.comment)) {
            updatedUserMovie.comment = updateUserMovie.comment;
        }

        if (!verifyStringIsEmpty(updateUserMovie.grade)) {
            if (Number(updateUserMovie.grade) < 0 || Number(updateUserMovie.grade) > 10) {
                return { message: "Informe uma nota válida (de 0 a 10)", property: "grade" }
            }
            updatedUserMovie.grade = Number(updateUserMovie.grade).toFixed();
        }

        if (!verifyNumberIsUndefinedOrNaN(updateUserMovie.statusId)) {
            const reqStatus: Partial<Status> = { id: Number(updateUserMovie.statusId) }
            const status = await this.statusService.getStatusById(reqStatus);
            if (!status) {
                return { message: "O status não foi encontrado.", property: "statusId" }
            }
            updatedUserMovie.status.id = status.id;
            updatedUserMovie.status.description = status.description;
        }

        await this.userMovieRepository.save(updatedUserMovie);
        return `Sua relação com o filme foi atualizada. Status: '${updatedUserMovie.status.description}'; Nota: '${updatedUserMovie.grade}'; Comentário: '${updatedUserMovie.comment}'`;
    }

    async filterUserMovie(filterUserMovie: IFilterUserMovie, reqUser: Partial<User>) {
        if (verifyStringIsEmpty(filterUserMovie.comment)) {
            filterUserMovie.comment = "";
        }

        if (verifyStringIsEmpty(filterUserMovie.grade)) {
            filterUserMovie.grade = "";
        }

        if (verifyNumberIsUndefinedOrNaN(Number(filterUserMovie.statusId))) {
            return await this.userMovieRepository.createQueryBuilder("usermovie")
                .innerJoin(Movie, "movie", "movie.id = usermovie.movieId")
                .innerJoin(Status, "status", "status.id = usermovie.statusId")
                .where("usermovie.userId = :userId", { userId: reqUser.id })
                .andWhere("LOWER(usermovie.comment) like LOWER(:comment)", { comment: `%${filterUserMovie.comment}%` })
                .andWhere("usermovie.grade like :grade", { grade: `%${filterUserMovie.grade}%` })
                .select(["usermovie.id", "usermovie.comment", "usermovie.grade", "usermovie.userId", "status.id", "status.description", "movie.id", "movie.name"])
                .orderBy("movie.name", "ASC")
                .execute();
        }

        return await this.userMovieRepository.createQueryBuilder("usermovie")
            .innerJoin(Movie, "movie", "movie.id = usermovie.movieId")
            .innerJoin(Status, "status", "status.id = usermovie.statusId")
            .where("usermovie.userId = :userId", { userId: reqUser.id })
            .andWhere("LOWER(usermovie.comment) like LOWER(:comment)", { comment: `%${filterUserMovie.comment}%` })
            .andWhere("usermovie.grade like :grade", { grade: `%${filterUserMovie.grade}%` })
            .andWhere("usermovie.statusId = :statusId", { statusId: filterUserMovie.statusId })
            .select(["usermovie.id", "usermovie.comment", "usermovie.grade", "usermovie.userId", "status.id", "status.description", "movie.id", "movie.name"])
            .orderBy("movie.name", "ASC")
            .execute();
    }

    async removeUserMovie(userMovieId: number): Promise<string | IUserMovieBadRequestError> {
        const userMovie = await this.userMovieRepository.findOneBy({ id: userMovieId });

        if (!userMovie) {
            return {
                message: "A relação usuário-filme não foi encontrada.",
                property: "id"
            }
        }

        await this.userMovieRepository.delete({ id: userMovieId });
        return `A relação do usuário '${userMovie.user.name}' e o filme '${userMovie.movie.name}' foi removida.`;
    }
}
