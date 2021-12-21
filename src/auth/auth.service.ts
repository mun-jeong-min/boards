import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { hash, compare } from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  public async signup({ id, password, username }: signupDto) {
    const hashedPassword = await hash(password, 12);

    await this.userRepository.save({
      id: id,
      username: username,
      password: hashedPassword,
    });
  }

  public async login({
    id,
    password,
  }: loginDto) {
    const user: User = await this.userRepository.findOne({ id: id });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await compare(password, user.password))) {
      throw new BadRequestException();
    }
    const payload = {id: user.id}
    const access_token = await this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
