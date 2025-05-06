import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { CreateKanbanBoardDto } from './dto/create-kanban-board.dto';
import { CreateKanbanColumnDto } from './dto/create-kanban-column.dto';
import { CreateKanbanItemDto } from './dto/create-kanban-item.dto';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Post('boards')
  createBoard(@Body() dto: CreateKanbanBoardDto) {
    return this.kanbanService.createBoard(dto);
  }

  @Post('columns')
  createColumn(@Body() dto: CreateKanbanColumnDto) {
    return this.kanbanService.createColumn(dto);
  }

  @Post('items')
  createItem(@Body() dto: CreateKanbanItemDto) {
    return this.kanbanService.createItem(dto);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.kanbanService.deleteItem(id);
  }

  @Delete('boards/:id')
  deleteBoard(@Param('id') id: string) {
    return this.kanbanService.deleteBoard(id);
  }

  @Get('boards')
  getBoards() {
    return this.kanbanService.getBoards();
  }
}
