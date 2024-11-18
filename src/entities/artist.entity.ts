import { IArtist } from '../artist/dto/artist.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'artists' })
export class Artist implements IArtist {
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
  @IsBoolean()
  @ApiProperty()
  grammy: boolean;

  constructor(artist: Partial<Artist>) {
    this.name = artist?.name;
    this.grammy = artist?.grammy;
  }
}
