import { Module } from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaController } from './idea.controller';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [IdeaController],
  providers: [IdeaService, PrismaService],
})
export class IdeaModule {}
