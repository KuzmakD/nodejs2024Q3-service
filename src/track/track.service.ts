import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { TrackEntity } from 'src/entities/track.entity';
import { DbEntities } from 'src/database/database.interface';

@Injectable()
export class TrackService {
  constructor(private db: DatabaseService) {}

  getAll() {
    return this.db.tracks;
  }

  getById(id: string) {
    const trackById = this.db.tracks.find((track) => track.id === id);
    if (!trackById) {
      throw new NotFoundException(`Track with id ${id} not exist`);
    }

    return trackById;
  }

  create(createTrackDto: CreateTrackDto) {
    const existArtistId = this.db.checkEntity(
      createTrackDto.artistId,
      DbEntities.ARTISTS,
    );
    if (!existArtistId && createTrackDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${createTrackDto.artistId} not exist`,
      );
    }

    const existAlbumId = this.db.checkEntity(
      createTrackDto.albumId,
      DbEntities.ALBUMS,
    );
    if (!existAlbumId && createTrackDto.albumId) {
      throw new NotFoundException(
        `Album with id ${createTrackDto.albumId} not exist`,
      );
    }

    const newTrack = new TrackEntity(createTrackDto);

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackById = this.getById(id);
    const existArtistId = this.db.checkEntity(
      updateTrackDto.artistId,
      DbEntities.ARTISTS,
    );
    if (!existArtistId && updateTrackDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${updateTrackDto.artistId} not exist`,
      );
    }

    const existAlbumId = this.db.checkEntity(
      updateTrackDto.albumId,
      DbEntities.ALBUMS,
    );
    if (!existAlbumId && updateTrackDto.albumId) {
      throw new NotFoundException(
        `Album with id ${updateTrackDto.albumId} not exist`,
      );
    }

    trackById.artistId = updateTrackDto.artistId;
    trackById.albumId = updateTrackDto.albumId;
    trackById.name = updateTrackDto.name;
    trackById.duration = updateTrackDto.duration;

    return trackById;
  }

  remove(id: string) {
    const trackById = this.getById(id);

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== trackById.id,
    );

    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
  }
}
