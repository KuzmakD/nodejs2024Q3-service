import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'rxjs';

@Injectable()
export class ArtistService {
  @InjectRepository(Artist)
  declare repository: Repository<Artist>;

  protected deleteEvent = new Subject<Artist['id']>();
  public delete$ = this.deleteEvent.asObservable();

  async getAll() {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Artist | null> {
    return this.repository.findOneBy({ id });
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
    await this.getById(id);

    return this.repository
      .preload({ id, ...updateArtistDto })
      .then((artist) => {
        return artist ? this.repository.save(artist) : artist;
      });
  }

  async remove(id: string): Promise<boolean> {
    await this.getById(id);

    return this.repository.findOneBy({ id }).then(async (artist) => {
      this.deleteEvent.next(id);
      return artist ? !!(await this.repository.remove(artist)) : false;
    });
  }
}
