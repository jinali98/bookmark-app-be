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
        data: {
          email: dto.email,
          hash: hash,
          lastName: dto.lastName,
          firstName: dto.firstName,
        },
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
  async login(dto: AuthDto) {
    try {
      // find the user with the email
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      // if the user is not found, throw an error
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }
      // compare the password hash with the password hash in the database
      const match = await argon.verify(user.hash, dto.password);
      // if the password is incorrect, throw an error
      if (!match) {
        throw new ForbiddenException('Invalid credentials');
      }
      // if the password is correct, return the user
      delete user.hash;
      return user;
    } catch (err) {}
  }
}
