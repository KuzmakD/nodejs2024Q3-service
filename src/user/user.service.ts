import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  getAll() {
    return 'This EP return all users!';
  }

  getById(id: number) {
    return `This EP returns user with id: ${id}`;
  }

  create(createUserDto: CreateUserDto) {
    return 'This EP creates a new user!';
  }

  update(id: number, updatePasswordDto: UpdatePasswordDto) {
    return `This EP updates user with id: ${id}`;
  }

  remove(id: number) {
    return `This EP removes user with id: ${id}`;
  }
}
