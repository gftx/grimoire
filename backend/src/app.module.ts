import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    IdeaModule,
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
