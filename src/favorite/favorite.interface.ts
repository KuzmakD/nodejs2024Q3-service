import { IAlbum } from '../album/dto/album.interface';
import { IArtist } from '../artist/dto/artist.interface';
import { ITrack } from '../track/dto/track.interface';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
