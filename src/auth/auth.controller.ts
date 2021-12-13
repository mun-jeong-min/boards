import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('signup')
    public async signup(@Body() body):Promise<void> {
        await this.authService.signup(body);
    }

    @Post('login')
    public async login(@Body() body):Promise<{accessToken:string, message:string}> {
        return await this.authService.login(body)
    }
}