import { Body, Controller, Post, Get, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
    @Get('/check')
    async check(@Headers('Authorization') token: string) {
        if (!token) {
            throw new HttpException('Не авторизован', HttpStatus.UNAUTHORIZED);
        }
        const accessToken = token.split(' ')[1];
        return this.authService.verifyAccessToken(accessToken);
    }
}
