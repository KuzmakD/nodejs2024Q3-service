import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'node:process';
import { User } from '../entities/user.entity';
import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Favorite } from '../entities/favorite.entity';
import 'dotenv/config';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.POSTGRES_HOST_DOCKER
    : process.env.POSTGRES_HOST;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: HOST,
      port: Number(env.POSTGRES_PORT),
      database: env.POSTGRES_DB_NAME,
      username: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      entities: [User, Track, Album, Artist, Favorite],
      synchronize: false,
      logging: true,
    }),
  ],
})
export class TypeOrmOptionsModule {}
