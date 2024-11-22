import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from '../entities/user.entity';
import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Favorite } from '../entities/favorite.entity';

const HOST =
  process.env.NODE_ENV === 'docker'
    ? process.env.POSTGRES_HOST_DOCKER
    : process.env.POSTGRES_HOST;

const options: DataSourceOptions = {
  type: 'postgres',
  host: HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB_NAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User, Track, Album, Artist, Favorite],
  logging: false,
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(options);
export default dataSource;
