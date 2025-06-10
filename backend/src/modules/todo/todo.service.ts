import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  delete(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }

  getByDate(date: string) {
    return this.prisma.todo.findMany({
      where: { date: new Date(date) },
    });
  }
}
