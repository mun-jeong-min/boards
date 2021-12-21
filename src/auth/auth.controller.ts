import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { signupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';
import { loginDto } from './dto/login.dto';

@ApiTags('유저 API')
@ApiResponse({ status: 200, description: '성공' })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: signupDto })
  @ApiCreatedResponse({ description: '성공', type: User })
  @Post('signup')
  public async signup(@Body() body): Promise<void> {
    await this.authService.signup(body);
  }

  @HttpCode(200)
  @Post('login')
  public async login(@Body() body: loginDto) {
    return await this.authService.login(body);
  }
}
