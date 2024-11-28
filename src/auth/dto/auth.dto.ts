import { ApiProperty, PickType } from '@nestjs/swagger';

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'login',
  'password',
]) {}

export class TokenDto {
  @ApiProperty()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  refreshToken: string | null;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty({ groups: ['unauthorized'] })
  refreshToken: string;
}
