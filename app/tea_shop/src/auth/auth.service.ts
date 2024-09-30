import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const { accessToken, refreshToken } = this.generateTokens(user);
    return { accessToken, refreshToken };
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new UnauthorizedException('Пользователь с таким email существует');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const { accessToken, refreshToken } = this.generateTokens(user);
    return { accessToken, refreshToken };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Некорректный email или пароль');
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException('Некорректный email или пароль');
  }

  private generateTokens(user: any): { accessToken: string; refreshToken: string } {
    const accessTokenPayload = { user_id: user.user_id, email: user.email };
    const refreshTokenPayload = { user_id: user.user_id, email: user.email };
    const accessToken = this.jwtService.sign(accessTokenPayload, { expiresIn: '30m', secret: process.env.ACCESS_TOKEN_SECRET });
    const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: '30d', secret: process.env.REFRESH_TOKEN_SECRET });
    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    try {
        const decodedToken = this.jwtService.verify(token, { secret: process.env.ACCESS_TOKEN_SECRET });
        const { user_id, email } = decodedToken;
        const accessToken = this.jwtService.sign({ user_id, email }, { expiresIn: '30m', secret: process.env.ACCESS_TOKEN_SECRET });
        const refreshToken = this.jwtService.sign({ user_id, email }, { expiresIn: '1d', secret: process.env.REFRESH_TOKEN_SECRET });
        return { accessToken, refreshToken, user_id };
    } catch (error) {
        throw new UnauthorizedException('Некорректный access токен');
    }
}
}
