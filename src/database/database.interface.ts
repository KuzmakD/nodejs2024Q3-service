import { IAlbum } from 'src/album/dto/album.interface';
import { IArtist } from 'src/artist/dto/artist.interface';
import { ITrack } from 'src/track/dto/track.interface';
import { IUser } from 'src/user/dto/user.interface';

export const enum DbEntities {
  ALBUMS = 'albums',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
  USERS = 'users',
}

export type TDbEntities = (IAlbum | IArtist | ITrack | IUser)[];
