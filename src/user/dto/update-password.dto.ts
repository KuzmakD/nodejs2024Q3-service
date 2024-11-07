import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'The Old Password is required' })
  @IsString({ message: 'The Password must be a string.' })
  oldPassword: string;

  @IsNotEmpty({ message: 'The New Password is required' })
  @IsString({ message: 'The Password must be a string.' })
  newPassword: string;
}
