import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { filter } from 'rxjs';
import { verifyNumberIsUndefinedOrNaN } from 'src/utils/verifyNumberIsUndefinedOrNaN';
import { verifyStringIsEmpty } from 'src/utils/verifyStringIsEmpty';
import { Repository } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { MoviesService } from '../movies/movies.service';
import { Status } from '../status/status.entity';
import { StatusService } from '../status/status.service';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ICreateUserMovie, IFilterUserMovie, IUserMovieBadRequestError } from './interfaces/user-movie';
import { UserMovie } from './user-movie.entity';

@Injectable()
export class UsersMoviesService {
    constructor(
        @InjectRepository(UserMovie) private userMovieRepository: Repository<UserMovie>,
        private userService: UsersService,
        private movieService: MoviesService,
        private statusService: StatusService,
    ) { }

    async createUserMovie(createUserMovie: ICreateUserMovie) {

        if (verifyNumberIsUndefinedOrNaN(Number(createUserMovie.userId))) {
            return { message: "Informe o Id do usuário.", property: "userId" }
        }

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

        const reqUser: Partial<User> = { id: Number(createUserMovie.userId) }
        const user = await this.userService.getUserById(reqUser);
        if (!user) {
            return { message: "O usuário não foi encontrado.", property: "userId" }
        }

        const reqMovie: Partial<Movie> = { id: Number(createUserMovie.movieId) }
        const movie = await this.movieService.getMovieById(reqMovie);
        if (!movie) {
            return { message: "O filme não foi encontrado.", property: "movieId" }
        }

        const userMovie = await this.userMovieRepository.findOne({
            where: {
                user: { id: user.id },
                movie: { id: movie.id }
            }
        });
        if (userMovie) {
            return { message: `Já existe uma relação do usuário '${user.name}' com o filme '${movie.name}'. Caso queira editar as informações dessa relação, atualize ela em vez de cria outra.`, property: "userId,movieId" }
        }

        const reqStatus: Partial<Status> = { id: Number(createUserMovie.statusId) }
        const status = await this.statusService.getStatusById(reqStatus);
        if (!status) {
            return { message: "O status não foi encontrado.", property: "statusId" }
        }

        const newUserMovie = this.userMovieRepository.create({
            user: createUserMovie.userId,
            movie: createUserMovie.movieId,
            status: createUserMovie.statusId,
            grade: createUserMovie.grade,
            comment: createUserMovie.comment
        });
        await this.userMovieRepository.save(newUserMovie);
        return `A relação do usuário '${user.name}' com o filme '${movie.name}' foi adicionada. Status: '${status.description}'; Nota: '${newUserMovie.grade}'; Comentário: '${newUserMovie.comment}'`;

    }

    async filterUserMovie(filterUserMovie: IFilterUserMovie) {
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
                .where("usermovie.userId = :userId", { userId: filterUserMovie.userId })
                .andWhere("LOWER(usermovie.comment) like LOWER(:comment)", { comment: `%${filterUserMovie.comment}%` })
                .andWhere("usermovie.grade like :grade", { grade: `%${filterUserMovie.grade}%` })
                .select(["usermovie.id", "usermovie.comment", "usermovie.grade", "usermovie.userId", "status.id", "status.description", "movie.id", "movie.name"])
                .orderBy("movie.name", "ASC")
                .execute();
        }

        return await this.userMovieRepository.createQueryBuilder("usermovie")
                .innerJoin(Movie, "movie", "movie.id = usermovie.movieId")
                .innerJoin(Status, "status", "status.id = usermovie.statusId")
                .where("usermovie.userId = :userId", { userId: filterUserMovie.userId })
                .andWhere("LOWER(usermovie.comment) like LOWER(:comment)", { comment: `%${filterUserMovie.comment}%` })
                .andWhere("usermovie.grade like :grade", { grade: `%${filterUserMovie.grade}%` })
                .andWhere("usermovie.statusId = :statusId", { statusId: filterUserMovie.statusId })
                .select(["usermovie.id", "usermovie.comment", "usermovie.grade", "usermovie.userId", "status.id", "status.description", "movie.id", "movie.name"])
                .orderBy("movie.name", "ASC")
                .execute();
    }
}
