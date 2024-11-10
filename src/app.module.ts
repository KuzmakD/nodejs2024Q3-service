import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
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
