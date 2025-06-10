import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateKanbanBoardDto } from './dto/create-kanban-board.dto';
import { CreateKanbanColumnDto } from './dto/create-kanban-column.dto';
import { CreateKanbanItemDto } from './dto/create-kanban-item.dto';

@Injectable()
export class KanbanService {
  constructor(private readonly prisma: PrismaService) {}

  async createBoard(dto: CreateKanbanBoardDto) {
    return this.prisma.kanbanBoard.create({
      data: {
        title: dto.title,
        description: dto.description,
      },
    });
  }

  async getBoards() {
    return this.prisma.kanbanBoard.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async deleteBoard(id: string) {
    return this.prisma.kanbanBoard.delete({
      where: { id },
    });
  }

  async createColumn(dto: CreateKanbanColumnDto) {
    return this.prisma.kanbanColumn.create({
      data: {
        boardId: dto.boardId,
        title: dto.title,
        order: dto.order,
      },
    });
  }

  async getColumns(boardId: string) {
    return this.prisma.kanbanColumn.findMany({
      where: { boardId },
      orderBy: { order: 'asc' },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }
  async createItem(dto: CreateKanbanItemDto) {
    return this.prisma.kanbanItem.create({
      data: {
        columnId: dto.columnId,
        title: dto.title ?? undefined,
        order: dto.order ?? 0,
      },
    });
  }

  async getItems(columnId: string) {
    return this.prisma.kanbanItem.findMany({
      where: { columnId },
      orderBy: { order: 'asc' },
    });
  }

  async deleteItem(id: string) {
    return this.prisma.kanbanItem.delete({
      where: { id },
    });
  }
}
