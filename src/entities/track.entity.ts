import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ITrack } from '../track/dto/track.interface';
import { Artist } from './artist.entity';
import { Album } from './album.entity';

@Entity({ name: 'tracks' })
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID(4)
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  artist: Artist | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  artistId: Artist['id'] | null;

  @ManyToOne(() => Album, { onDelete: 'SET NULL' })
  @Exclude()
  @IsOptional()
  album: Album | null;

  @Column({ nullable: true })
  @IsUUID(4)
  @IsOptional()
  @ApiProperty({ format: 'uuid', type: 'string', required: false })
  albumId: Album['id'] | null;

  @Column()
  @IsInt()
  @Min(0)
  @ApiProperty({ minimum: 0 })
  duration: number;

  constructor(track: Partial<Track>) {
    this.name = track?.name;
    this.artistId = track?.artistId;
    this.albumId = track?.albumId;
    this.duration = track?.duration;
  }
}
