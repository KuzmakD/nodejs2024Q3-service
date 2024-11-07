import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IAlbum } from './album.interface';

export class CreateAlbumDto implements Omit<IAlbum, 'id'> {
  @IsNotEmpty({ message: 'The name cannot be empty.' })
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The year cannot be empty.' })
  @IsInt({ message: 'The year must be an integer' })
  year: number;

  @IsOptional()
  @IsUUID('4', {
    message: 'The ArtistId must be a UUID v4',
    each: true,
  })
  artistId: string | null;
}
