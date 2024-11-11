import { v4 as uuidV4 } from 'uuid';
import { IArtist } from '../artist/dto/artist.interface';

export class ArtistEntity implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ name, grammy }: Partial<ArtistEntity>) {
    this.id = uuidV4();
    this.name = name;
    this.grammy = grammy;
  }
}
