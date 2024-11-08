import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  getAll(): string {
    return 'This EP return all tracks!';
  }

  getById(id: string) {
    return `This EP return track with id: ${id}`;
  }

  create(createTrackDto: CreateTrackDto): string {
    return 'This EP creates a ne track';
  }

  update(id: string, updateTrackto: UpdateTrackDto) {
    return `This EP update track with id: ${id}`;
  }

  remove(id: string) {
    return `This EP remove track with id: ${id}`;
  }
}
