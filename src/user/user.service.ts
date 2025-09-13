import { Injectable, Inject, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  private readonly jwtSecret = 'SECRET 123KJ3JNASDJNSNDA JNSDN23N213KJ21321'; //TODO: Store this in a .env file

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex');

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; user: { id: number; username: string } }> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const hashedPassword = crypto
      .createHash('sha1')
      .update(password)
      .digest('hex');

    if (user.password !== hashedPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      this.jwtSecret,
      { expiresIn: '24h' },
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  }
}
