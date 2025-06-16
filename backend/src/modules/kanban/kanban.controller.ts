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
import { RequestUser } from 'src/common/decorators/request-user.decorator';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Post('boards')
  createBoard(
    @RequestUser() user: { id: string },
    @Body() dto: CreateKanbanBoardDto,
  ) {
    return this.kanbanService.createBoard(user.id, dto);
  }

  @Get('boards')
  getBoards(@RequestUser() user: { id: string }) {
    return this.kanbanService.getBoards(user.id);
  }

  @Delete('boards/:id')
  deleteBoard(@RequestUser() user: { id: string }, @Param('id') id: string) {
    return this.kanbanService.deleteBoard(user.id, id);
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
