import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from '../models/user.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async register(@Body() credentials: RegistrationDto) {
    return this.authService.register(credentials);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() credentials) {
    return this.authService.login(credentials);
  }
}
