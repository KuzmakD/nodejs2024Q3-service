import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumService {
  getAlbum(): string {
    return 'Hello Album!';
  }
}
