import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  // constructor(private db: DatabaseService) {}
  @InjectRepository(Artist)
  declare repository: Repository<Artist>;

  async getAll() {
    return this.repository.find();
  }

  async getById(id: string) {
    const artistById = await this.repository.findOneBy({ id });

    if (!artistById) {
      throw new NotFoundException(`Artist with id ${id} not exist`);
    }

    return artistById;
  }

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = new Artist(createArtistDto);
    await this.repository.save(newArtist);

    return newArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistById = await this.getById(id);
    artistById.name = updateArtistDto.name;
    artistById.grammy = updateArtistDto.grammy;

    await this.repository.save(artistById);

    return artistById;
  }

  remove(id: string): Promise<boolean> {
    return this.repository.findOneBy({ id }).then(async (artist) => {
      return artist ? !!(await this.repository.remove(artist)) : false;
    });
  }
}
