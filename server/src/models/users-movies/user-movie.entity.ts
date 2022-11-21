import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";
import { User } from "../users/user.entity";
import { Status } from "../status/status.entity";

@Entity('user_movies')
export class UserMovie {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.userMovies)
    @JoinColumn({ name: 'userId' })
    user: User;

    @ManyToOne(() => Movie, movie => movie.userMovies)
    @JoinColumn({ name: 'movieId' })
    movie: string;

    @ManyToOne(() => Status, status => status.userMovies)
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @Column({ type: 'float', nullable: true })
    grade: number;

    @Column()
    comment: string;
}