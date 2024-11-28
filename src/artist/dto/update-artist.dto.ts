import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateArtistDto {
  @IsString({ message: 'The name must be a string.' })
  @IsOptional()
  name: string;

  @IsBoolean({ message: 'The Grammy can be true or false.' })
  @IsOptional()
  grammy: boolean;
}
