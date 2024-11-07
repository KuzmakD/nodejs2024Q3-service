import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { IArtist } from './artist.interface';

export class CreateArtistDto implements Omit<IArtist, 'id'> {
  @IsNotEmpty({ message: 'The name cannot be empty' })
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsNotEmpty({ message: 'The Grammy cannot be empty' })
  @IsBoolean({ message: 'The Grammy can be true or false' })
  grammy: boolean;
}
