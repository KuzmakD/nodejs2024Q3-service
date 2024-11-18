import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

export class Favorite {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor() {
    this.artists = new Array<Artist>();
    this.albums = new Array<Album>();
    this.tracks = new Array<Track>();
  }
}
