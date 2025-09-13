import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  user(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/')
  createUser(
    @Body() CreateUserDto: { username: string; password: string },
  ): Promise<User> {
    return this.userService.create(
      CreateUserDto.username,
      CreateUserDto.password,
    );
  }

  @Post('/login')
  login(
    @Body() loginDto: { username: string; password: string },
  ): Promise<{ token: string; user: { id: number; username: string } }> {
    return this.userService.login(loginDto.username, loginDto.password);
  }
}
