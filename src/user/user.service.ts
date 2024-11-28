import {
  Delete,
  ForbiddenException,
  HttpCode,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { User, UserResponse } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Injectable()
export class UserService {
  @InjectRepository(User)
  declare repository: Repository<User>;

  async getAll() {
    return this.repository.find();
  }

  async getById(id: string) {
    const userById = await this.repository.findOneBy({ id });

    if (!userById) {
      throw new NotFoundException(`User with id ${id} not exist`);
    }

    return userById;
  }

  async getByLogin(login: User['login']) {
    const userByLogin = await this.repository.findOne({ where: { login } });

    return userByLogin;
  }

  async create(createUserDto: CreateUserDto) {
    await this.repository.findOne({
      where: { login: createUserDto.login },
    });

    const newUser = new User(createUserDto as User);
    validate(newUser, { forbidUnknownValues: true });

    await this.repository.save(newUser);

    return new UserResponse(newUser);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const userById = await this.getById(id);

    if (!(await userById.checkPassword(updatePasswordDto.oldPassword))) {
      throw new ForbiddenException();
    }
    userById.password = updatePasswordDto.newPassword;
    userById.version = userById.version + 1;
    userById.updatedAt = new Date();

    await this.repository.save(userById);

    return new UserResponse(userById);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({
    name: 'id',
    format: 'uuid',
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 204, description: 'Successful' })
  @ApiResponse({ status: 400, description: 'ID has invalid format' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(id: string) {
    const removedUser = await this.getById(id);

    await this.repository.remove(removedUser);
    return removedUser;
  }
}
