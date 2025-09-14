import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminOnlyGuard } from '../auth/admin-only.guard';
import { AdminOnly } from '../auth/admin-only.decorator';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/admin/users')
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @AdminOnly()
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
  ): Promise<{
    token: string;
    user: { id: number; username: string; role: UserRole };
  }> {
    return this.userService.login(loginDto.username, loginDto.password);
  }

  @Put('/admin/users/:id/role')
  @UseGuards(JwtAuthGuard, AdminOnlyGuard)
  @AdminOnly()
  updateUserRole(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateRoleDto: { role: UserRole },
  ): Promise<User> {
    return this.userService.updateUserRole(userId, updateRoleDto.role);
  }
}
