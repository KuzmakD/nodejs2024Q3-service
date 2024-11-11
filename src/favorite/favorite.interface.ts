import { IAlbum } from 'src/album/dto/album.interface';
import { IArtist } from 'src/artist/dto/artist.interface';
import { ITrack } from 'src/track/dto/track.interface';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
