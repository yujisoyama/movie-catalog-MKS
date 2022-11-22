import { StatusModule } from './models/status/status.module';
import { UsersMoviesModule } from './models/users-movies/users-movies.module';
import { MoviesModule } from './models/movies/movies.module';
import { MoviesController } from './models/movies/movies.controller';
import { AuthModule } from './models/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [
    StatusModule,
    UsersMoviesModule,
    MoviesModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ['./**/*.entity.js'],
      synchronize: true,
      // ssl: {
      //   rejectUnauthorized: false
      // }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
