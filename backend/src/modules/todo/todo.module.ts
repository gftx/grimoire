import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
