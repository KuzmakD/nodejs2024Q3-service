import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { ArtistEntity } from '../entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DatabaseService) {}

  async getAll() {
    return this.db.artists;
  }

  async getById(id: string) {
    const artistById = this.db.artists.find((artist) => artist.id === id);

    if (!artistById) {
      throw new NotFoundException(`Artist with id ${id} not exist`);
    }

    return artistById;
  }

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = new ArtistEntity(createArtistDto);
    this.db.artists.push(newArtist);

    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistById = await this.getById(id);

    console.log(`This EP updates artist with id: ${id}`, artistById);
    artistById.name = updateArtistDto.name;
    artistById.grammy = updateArtistDto.grammy;
    return artistById;
  }

  async remove(id: string) {
    this.getById(id);

    this.db.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });

    this.db.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (storeId) => storeId !== id,
    );

    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
  }
}
