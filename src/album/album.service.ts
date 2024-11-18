import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from 'rxjs';

@Injectable()
export class AlbumService {
  @InjectRepository(Album)
  declare repository: Repository<Album>;

  protected deleteEvent = new Subject<Album['id']>();
  public delete$ = this.deleteEvent.asObservable();

  async getAll() {
    return this.repository.find();
  }

  async getById(id: string) {
    const albumById = await this.repository.findOneBy({ id });

    if (!albumById) {
      throw new NotFoundException(`Album with id ${id} not exist`);
    }

    return albumById;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new Album(createAlbumDto);
    await this.repository.save(newAlbum);

    return newAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.getById(id);

    return this.repository.preload({ id, ...updateAlbumDto }).then((album) => {
      return album ? this.repository.save(album) : album;
    });
  }

  async remove(id: string) {
    await this.getById(id);

    // return removedAlbum
    //   ? !!(await this.repository.remove(removedAlbum))
    //   : false;
    return this.getById(id).then(async (album) => {
      this.deleteEvent.next(id);
      return album ? !!(await this.repository.remove(album)) : false;
    });
  }
}
