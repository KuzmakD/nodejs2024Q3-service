import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Favorite } from '../entities/favorite.entity';
import { AbstractService } from '../common/abstract.service';
import { validate } from 'class-validator';

@Injectable()
export class FavoriteService extends AbstractService<Favorite> {
  protected services: {
    artists: ArtistService;
    albums: AlbumService;
    tracks: TrackService;
  };

  constructor(
    @InjectRepository(Favorite)
    repository: Repository<Favorite>,
    artistService: ArtistService,
    albumService: AlbumService,
    trackService: TrackService,
  ) {
    super(repository);
    this.services = {
      artists: artistService,
      albums: albumService,
      tracks: trackService,
    };
  }

  create(createDto: Partial<Favorite>) {
    const entity = new Favorite({
      artists: [],
      albums: [],
      tracks: [],
      ...createDto,
    });
    validate(entity, { forbidUnknownValues: true });

    return this.repository.save(entity);
  }

  async getFavsByUser(userId: Favorite['userId']): Promise<Favorite> {
    return (
      (await this.repository.findOne({ where: { userId } })) ||
      (await this.create({ userId }))
    );
  }

  async addTrackToFavs(favs: Favorite, id: string) {
    const trackById = await this.services.tracks.findOne(id);

    if (!trackById) {
      throw new HttpException(
        `The track with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favs.tracks) {
      favs.tracks = [];
    }

    const alreadyTrackInFavs = favs.tracks.some((track) => track.id === id);
    if (alreadyTrackInFavs) {
      throw new Error(`The track with ID ${id} is already in favorites`);
    }

    favs.tracks.push(trackById);

    return this.repository.save(favs);
  }

  async addAlbumToFavs(favs: Favorite, id: string) {
    const albumById = await this.services.albums.findOne(id);

    if (!albumById) {
      throw new HttpException(
        `The album with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (!favs.albums) {
      favs.albums = [];
    }

    const alreadyAlbumInFavs = favs.albums.some((album) => album.id === id);
    if (alreadyAlbumInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    favs.albums.push(albumById);

    return this.repository.save(favs);
  }

  async addArtistToFavs(favs: Favorite, id: string) {
    const artistById = await this.services.artists.findOne(id);

    if (!artistById) {
      throw new HttpException(
        `The artist with ID ${id} not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    if (!favs.artists) {
      favs.artists = [];
    }

    const alreadyArtistInFavs = favs.artists.some((artist) => artist.id === id);
    if (alreadyArtistInFavs) {
      throw new Error(`The album with ID ${id} is already in favorites`);
    }

    favs.artists.push(artistById);

    return this.repository.save(favs);
  }

  async removeTrackFromFavs(favs: Favorite, id: string) {
    const index = favs.tracks.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `The track with ID ${id} not found in favorites`,
      );
    }

    favs.tracks.splice(index, 1);

    return this.repository.save(favs);
  }

  async removeAlbumFromFavs(favs: Favorite, id: string) {
    const index = favs.albums.findIndex((album) => album.id === id);

    if (index !== -1) {
      throw new NotFoundException(`Album with ID ${id} not found in favorites`);
    }

    favs.albums.splice(index, 1);

    return this.repository.save(favs);
  }

  async removeArtistFromFavs(favs: Favorite, id: string) {
    const index = favs.artists.findIndex((artist) => artist.id === id);

    if (index !== -1) {
      throw new NotFoundException(`Artist with ID ${id} not found in favorite`);
    }

    favs.artists.splice(index, 1);

    return this.repository.save(favs);
  }
}
