import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { signupDto } from 'src/auth/dto/signup.dto';
import { User } from 'src/auth/entity/user.entity';

@Injectable()
export class EmailService {
    
}
