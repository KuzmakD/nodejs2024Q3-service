import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoriteService {
  getFavorite(): string {
    return 'Hello Favorite!';
  }
}
