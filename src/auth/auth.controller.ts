import { Body, Controller, Get, Post, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';

@ApiTags('유저 API')
@ApiResponse({status:200, description: '성공'})
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @ApiBody({type: signupDto})
    @ApiCreatedResponse({description: '성공', type:User})
    @Post('signup')
    public async signup(@Body() body):Promise<void> {
        await this.authService.signup(body);
    }

    @Post('login')
    public async login(@Body() body):Promise<{accessToken:string, message:string}> {
        return await this.authService.login(body)
    }
}