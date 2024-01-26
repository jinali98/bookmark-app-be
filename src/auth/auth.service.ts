import { ForbiddenException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(dto: AuthDto) {
    try {
      // generate a password hash
      const hash = await argon.hash(dto.password);

      // save the new user in the database

      const user = await this.prisma.user.create({
        data: { email: dto.email, hash: hash },
        select: { id: true, email: true, createdAt: true },
      });
      // return the saved user

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials already exists');
        }
      }
    }
  }
  login() {
    // find the user with the email

    // compare the password hash with the password hash in the database
    // if the password is correct, return the user
    return { message: 'Login' };
  }
}
