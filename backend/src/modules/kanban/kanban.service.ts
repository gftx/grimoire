import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateKanbanBoardDto } from './dto/create-kanban-board.dto';
import { CreateKanbanColumnDto } from './dto/create-kanban-column.dto';
import { CreateKanbanItemDto } from './dto/create-kanban-item.dto';

@Injectable()
export class KanbanService {
  constructor(private readonly prisma: PrismaService) {}

  createBoard(dto: CreateKanbanBoardDto) {
    return this.prisma.kanbanBoard.create({ data: dto });
  }

  createColumn(dto: CreateKanbanColumnDto) {
    return this.prisma.kanbanColumn.create({ data: dto });
  }

  createItem(dto: CreateKanbanItemDto) {
    return this.prisma.kanbanItem.create({ data: dto });
  }

  deleteItem(id: string) {
    return this.prisma.kanbanItem.delete({ where: { id } });
  }

  deleteBoard(id: string) {
    return this.prisma.kanbanBoard.delete({ where: { id } });
  }

  getBoards() {
    return this.prisma.kanbanBoard.findMany({
      include: {
        columns: {
          include: {
            items: {
              include: { idea: true },
            },
          },
        },
      },
    });
  }
}
