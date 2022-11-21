import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserMovie } from "../users-movies/user-movie.entity";


@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    genre: string;

    @Column()
    year: string;

    @Column()
    sinopsis: string;

    @OneToMany(() => UserMovie, userMovies => userMovies.movie)
    userMovies: UserMovie[];
}