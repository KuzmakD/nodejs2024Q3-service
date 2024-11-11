import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { AlbumEntity } from 'src/entities/album.entity';
import { DbEntities } from 'src/database/database.interface';
import { ITrack } from 'src/track/dto/track.interface';
import { IAlbum } from './dto/album.interface';

@Injectable()
export class AlbumService {
  constructor(private db: DatabaseService) {}

  getAll() {
    return this.db.albums;
  }

  getById(id: string) {
    const albumById = this.db.albums.find((album) => album.id === id);

    if (!albumById) {
      throw new NotFoundException(`Album with id ${id} not exist`);
    }

    return albumById;
  }

  create(createAlbumDto: CreateAlbumDto) {
    const existArtist = this.db.checkEntity(
      createAlbumDto.artistId,
      DbEntities.ARTISTS,
    );

    if (!existArtist && createAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${createAlbumDto.artistId} not exist`,
      );
    }
    const newAlbum = new AlbumEntity(createAlbumDto);
    this.db.albums.push(newAlbum);

    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const albumById = this.getById(id);
    const existArtist = this.db.checkEntity(
      updateAlbumDto.artistId,
      DbEntities.ARTISTS,
    );
    if (!existArtist && updateAlbumDto.artistId) {
      throw new NotFoundException(
        `Artist with id ${updateAlbumDto.artistId} not exist`,
      );
    }
    albumById.artistId = updateAlbumDto.artistId;
    albumById.name = updateAlbumDto.name;
    albumById.year = updateAlbumDto.year;

    return albumById;
  }

  remove(id: string) {
    this.getById(id);
    this.db.tracks.forEach((track: ITrack) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (album: IAlbum) => album.id !== id,
    );
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}
