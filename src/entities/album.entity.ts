import { v4 as uuidV4 } from 'uuid';
import { IAlbum } from '../album/dto/album.interface';

export class AlbumEntity implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ name, year, artistId }: AlbumEntity) {
    this.id = uuidV4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
