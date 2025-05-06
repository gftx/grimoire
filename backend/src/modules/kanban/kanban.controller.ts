import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('boards')
  getBoards() {
    return this.kanbanService.getBoards();
  }

  @Delete('boards/:id')
  deleteBoard(@Param('id') id: string) {
    return this.kanbanService.deleteBoard(id);
  }

  @Post('columns')
  createColumn(@Body() dto: CreateKanbanColumnDto) {
    return this.kanbanService.createColumn(dto);
  }

  @Get('columns')
  getColumns(@Query('boardId') boardId: string) {
    return this.kanbanService.getColumns(boardId);
  }

  @Post('items')
  createItem(@Body() dto: CreateKanbanItemDto) {
    return this.kanbanService.createItem(dto);
  }

  @Get('items')
  getItems(@Query('columnId') columnId: string) {
    return this.kanbanService.getItems(columnId);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.kanbanService.deleteItem(id);
  }
}
