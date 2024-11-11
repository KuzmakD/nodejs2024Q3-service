import { AlbumEntity } from './album.entity';
import { ArtistEntity } from './artist.entity';
import { TrackEntity } from './track.entity';

export class Favorite {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];

  constructor() {
    this.artists = new Array<ArtistEntity>();
    this.albums = new Array<AlbumEntity>();
    this.tracks = new Array<TrackEntity>();
  }
}
