import { Album } from './album.entity';
import { Artist } from './artist.entity';
import { Track } from './track.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

import { IsUUID, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'favorites' })
export class Favorite extends AbstractEntity<Favorite> {
  @Column('uuid')
  @IsUUID(4)
  @IsOptional()
  @Exclude()
  userId: User['id'];

  @ManyToMany(() => Artist, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ManyToMany(() => Album, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ManyToMany(() => Track, { eager: true })
  @JoinTable()
  @ApiProperty({ type: [Track] })
  tracks: Track[];
}
