import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  getAll() {
    return 'This EP return all users!';
  }

  getById(id: number) {
    return `This EP returns artist with id: ${id}`;
  }

  create(createArtistDto: CreateArtistDto) {
    return 'This EP creates a new artist!';
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This EP updates artist with id: ${id}`;
  }

  remove(id: number) {
    return `This EP removes artist with id: ${id}`;
  }
}
