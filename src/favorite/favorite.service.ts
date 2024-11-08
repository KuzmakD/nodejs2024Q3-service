import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  getAll() {
    return 'This EP return all all favorite records!';
  }

  getById(id: string) {
    return `This EP returns artist with id: ${id}`;
  }

  addTrackToFavs(id: string) {
    return `This EP add the track with ${id} to the favorites!`;
  }

  addAlbumToFavs(id: string) {
    return `This EP add the album with ${id} to the favorites!`;
  }

  addArtistToFavs(id: string) {
    return `This EP add the artist with ${id} to the favorites!`;
  }

  removeTrackFromFavs(id: string) {
    return `This EP remove the track with ${id} from  the favorites!`;
  }

  removeAlbumFromFavs(id: string) {
    return `This EP remove the album with ${id} from the favorites!`;
  }

  removeArtistFromFavs(id: string) {
    return `This EP remove the artist with ${id} from the favorites!`;
  }
}
