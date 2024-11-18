import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { DatabaseModule } from './database/database.module';
import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB_NAME,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    TrackModule,
    FavoriteModule,
    ArtistModule,
    AlbumModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
