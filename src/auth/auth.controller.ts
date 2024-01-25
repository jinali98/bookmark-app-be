import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Req() req: Request) {
    return this.authService.signup();
  }

  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login();
  }
}
