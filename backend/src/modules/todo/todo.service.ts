import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, dto: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: string, date?: string) {
    const where: Prisma.TodoWhereInput = { userId };
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.date = { gte: start, lte: end };
    }

    return this.prisma.todo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, id: string, dto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: dto,
    });
  }

  async toggleCompleted(userId: string, id: string, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed },
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
