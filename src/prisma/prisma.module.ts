import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * to make it a global module so that it can be used in other
 * modules without importing it
 *  */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
