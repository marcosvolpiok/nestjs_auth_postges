import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/')
  createUser(
    @Body() CreateUserDto: { username: string; password: string }): Promise<User> {
    return this.userService.create(
      CreateUserDto.username,
      CreateUserDto.password,
    );
  }
}
