import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/album/dto/album.interface';
import { IArtist } from 'src/artist/dto/artist.interface';
import { ITrack } from 'src/track/dto/track.interface';
import { IFavorites } from 'src/favorite/favorite.interface';
import { IUser } from 'src/user/dto/user.interface';

@Injectable()
export class DatabaseService {
  users: Array<IUser> = [];
  albums: Array<IAlbum> = [];
  artists: Array<IArtist> = [];
  tracks: Array<ITrack> = [];
  favorites: IFavorites;
}
