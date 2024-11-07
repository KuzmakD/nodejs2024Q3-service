import { IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @IsOptional()
  @IsInt({ message: 'The year must be an integer' })
  year: number;

  @IsOptional()
  @IsUUID('4', {
    message: 'ArtistId must be a UUID v4',
    each: true,
  })
  artistId: string | null;
}
