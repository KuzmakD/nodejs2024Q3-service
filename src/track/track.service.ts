import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Subject } from 'rxjs';
import { validate } from 'class-validator';

@Injectable()
export class TrackService {
  @InjectRepository(Track)
  declare repository: Repository<Track>;

  protected deleteEvent = new Subject<Track['id']>();
  public delete$ = this.deleteEvent.asObservable();

  async getAll(): Promise<Track[] | null> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Track | null> {
    return this.repository.findOneBy({ id });
  }

  async getById(id: string): Promise<Track | null> {
    const trackById = await this.repository.findOneBy({ id });
    if (!trackById) {
      throw new NotFoundException(`Track with id ${id} not exist`);
    }

    return trackById;
  }

  async create(createTrackDto: CreateTrackDto) {
    const newTrack = new Track(createTrackDto as Track);

    validate(newTrack, { forbidUnknownValues: true });

    return this.repository.save(newTrack);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.getById(id);

    return this.repository
      .preload({ id, ...updateTrackDto } as DeepPartial<Track>)
      .then((track) => {
        return track ? this.repository.save(track) : track;
      });
  }

  async remove(id: string) {
    await this.getById(id);

    return this.findOne(id).then(async (track) => {
      this.deleteEvent.next(id);
      return track ? !!(await this.repository.remove(track)) : false;
    });
  }
}
