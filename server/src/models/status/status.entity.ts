import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserMovie } from "../users-movies/user-movie.entity";


@Entity('status')
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    description: string;

    @OneToMany(() => UserMovie, userMovies => userMovies.status)
    userMovies: UserMovie[];
}