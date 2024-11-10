import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IAlbum } from 'src/album/dto/album.interface';
import { IArtist } from 'src/artist/dto/artist.interface';
import { DatabaseService } from 'src/database/database.service';
import { ITrack } from 'src/track/dto/track.interface';

@Injectable()
export class FavoriteService {
  constructor(private db: DatabaseService) {}

  getAll() {
    return this.db.favorites;
  }

  addTrackToFavs(id: string) {
    const trackById: ITrack = this.db.tracks.find((track) => track.id === id);

    if (!trackById) {
      throw new HttpException(
        `The track with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const alreadyTrackInFavs = this.db.favorites.tracks.some(
      (track) => track.id === id,
    );
    if (alreadyTrackInFavs) {
      throw new Error(`The track with ID ${id} is already in favorites`);
    }

    this.db.favorites.tracks.push(trackById);

    return trackById;
  }

  addAlbumToFavs(id: string) {
    const albumById: IAlbum = this.db.albums.find((album) => album.id === id);

    if (!albumById) {
      throw new HttpException(
        `The album with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const alreadyAlbumInFavs = this.db.favorites.albums.some(
      (album) => album.id === id,
    );
    if (alreadyAlbumInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    this.db.favorites.albums.push(albumById);

    return albumById;
  }

  addArtistToFavs(id: string) {
    const artistById: IArtist = this.db.artists.find(
      (artist) => artist.id === id,
    );

    if (!artistById) {
      throw new HttpException(
        `The artist with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const alreadyArtistInFavs = this.db.favorites.artists.some(
      (artist) => artist.id === id,
    );
    if (alreadyArtistInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    this.db.favorites.artists.push(artistById);

    return artistById;
  }

  removeTrackFromFavs(id: string) {
    const alreadyTrackInFavs = this.db.favorites.tracks.some(
      (track) => track.id === id,
    );
    if (!alreadyTrackInFavs) {
      throw new NotFoundException(
        `The track with ID ${id} not found in favorites`,
      );
    }

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }

  removeAlbumFromFavs(id: string) {
    const alreadyAlbumInFavs = this.db.favorites.albums.some(
      (album) => album.id === id,
    );

    if (!alreadyAlbumInFavs) {
      throw new NotFoundException(
        `The album with ID ${id} not found in favorites`,
      );
    }

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  removeArtistFromFavs(id: string) {
    const alreadyArtistInFavs = this.db.favorites.artists.some(
      (artist) => artist.id === id,
    );

    if (!alreadyArtistInFavs) {
      throw new NotFoundException(
        `The atist with ID ${id} not found in favorites`,
      );
    }

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
