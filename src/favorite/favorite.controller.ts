import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  getAll() {
    return this.favoriteService.getAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.getById(id);
  }

  @Post('track/:id')
  addTrackToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addTrackToFavs(id);
  }

  @Post('album/:id')
  addAlbumToFavs(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.addAlbumToFavs(id);
  }

  @Post('artist/:id')
  addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addArtistToFavs(id);
  }

  @Delete('track/:id')
  removeTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeTrackFromFavs(id);
  }

  @Delete('album/:id')
  removeAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeAlbumFromFavs(id);
  }

  @Delete('artist/:id')
  removeArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeArtistFromFavs(id);
  }
}
