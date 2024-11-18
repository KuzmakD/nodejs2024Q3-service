import { IAlbum } from '../album/dto/album.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsOptional,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Artist } from './artist.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'albums' })
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @Column()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @ApiProperty({ format: 'year', minimum: 1900 })
  year: number;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  artist: Artist | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null;

  constructor(album: Partial<Album>) {
    this.name = album?.name;
    this.year = album?.year;
    this.artistId = album?.artistId;
  }
}
