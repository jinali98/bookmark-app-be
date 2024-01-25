import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  login() {
    return { message: 'Login' };
  }

  signup() {
    return { message: 'Signup' };
  }
}
