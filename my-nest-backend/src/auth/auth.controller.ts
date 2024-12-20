import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Post('refresh')
  refreshToken(@Body() refreshDto: { username: string }) {
    return this.authService.refreshToken(refreshDto.username);
  }
}