import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";
import { User } from "../users/user.entity";
import { Status } from "../status/status.entity";

@Entity('user_movies')
export class UserMovie {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userMovies, { nullable: false, eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Movie, movie => movie.userMovies, { nullable: false, eager: true })
    @JoinColumn({ name: 'movieId' })
    movie: Movie;

    @ManyToOne(() => Status, status => status.userMovies, { nullable: false, eager: true })
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @Column({ nullable: true })
    grade: string;

    @Column({ nullable: true })
    comment: string;
}