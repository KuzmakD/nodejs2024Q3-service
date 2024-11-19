import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from 'src/entities/favorite.entity';
import { User } from 'src/entities/user.entity';

@Controller('favs')
@ApiTags('Favorites')
export class FavoriteController {
  protected blank_user: User['id'] = 'd323327d-cea8-4f42-8730-5221222361de';
  constructor(private readonly favoriteService: FavoriteService) {}

  protected async getUserFavorite() {
    return this.favoriteService.getFavsByUser(this.blank_user);
  }

  @Get()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, type: Favorite })
  async getAll() {
    return this.getUserFavorite();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorite list' })
  async addTrackToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addTrackToFavs(
      await this.getUserFavorite(),
      id,
    );
  }

  @Post('album/:id')
  async addAlbumToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addAlbumToFavs(
      await this.getUserFavorite(),
      id,
    );
  }

  @Post('artist/:id')
  async addArtistToFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.addArtistToFavs(
      await this.getUserFavorite(),
      id,
    );
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  async removeTrackFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeTrackFromFavs(
      await this.getUserFavorite(),
      id,
    );
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  async removeAlbumFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeAlbumFromFavs(
      await this.getUserFavorite(),
      id,
    );
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  async removeArtistFromFavs(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.favoriteService.removeArtistFromFavs(
      await this.getUserFavorite(),
      id,
    );
  }
}
