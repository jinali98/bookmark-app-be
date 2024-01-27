import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: AuthDto) {
    console.log(body);
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }
}
