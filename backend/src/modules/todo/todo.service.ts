import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTodoDto) {
    return this.prisma.todo.create({ data: dto });
  }

  update(id: string, dto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }

  getByDate(date: string) {
    return this.prisma.todo.findMany({
      where: {
        date: new Date(date),
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
