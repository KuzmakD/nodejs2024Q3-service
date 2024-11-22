import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TypeOrmOptionsModule } from './database/typeORM.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    FavoriteModule,
    ArtistModule,
    AlbumModule,
    TypeOrmOptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
