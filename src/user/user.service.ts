import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  getAll() {
    return this.db.users;
  }

  getById(id: string) {
    const userById = this.db.users.find((user) => user.id === id);

    if (!userById) {
      throw new NotFoundException(`User with id ${id} not exist`);
    }

    return userById;
  }

  create(createUserDto: CreateUserDto) {
    const existUser = this.db.users.find(
      (user) => user.login === createUserDto.login,
    );
    if (existUser) {
      throw new HttpException(
        `User with login ${createUserDto.login} already exist!`,
        HttpStatus.CONFLICT,
      );
    }
    const newUser = new UserEntity(createUserDto);
    this.db.users.push(newUser);

    return newUser;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = this.getById(id);
    if (userById.password !== updatePasswordDto.oldPassword) {
      throw new HttpException(
        'Old password does not match existing password',
        HttpStatus.FORBIDDEN,
      );
    }
    userById.password = updatePasswordDto.newPassword;
    userById.version = userById.version + 1;
    userById.updatedAt = Date.now();

    return userById;
  }

  remove(id: string) {
    this.getById(id);

    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
