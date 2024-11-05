import { Injectable } from '@nestjs/common';

@Injectable()
export class ArtistService {
  getArtist(): string {
    return 'Hello Artist!';
  }
}
