import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The Login cannot be empty' })
  @IsString({ message: 'The Login must be a string.' })
  login: string;

  @IsNotEmpty({ message: 'The Password cannot be empty' })
  @IsString({ message: 'The Password must be a string.' })
  password: string;
}
