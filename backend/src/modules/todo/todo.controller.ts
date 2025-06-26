import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { RequestUser } from 'src/common/decorators/request-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@RequestUser() user: { userId: string }, @Body() dto: CreateTodoDto) {
    return this.todoService.create(user.userId, dto);
  }

  @Get()
  findAll(
    @RequestUser() user: { userId: string },
    @Query('date') date?: string,
  ) {
    return this.todoService.findAll(user.userId, date);
  }

  @Patch(':id')
  update(
    @RequestUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.todoService.update(user.userId, id, dto);
  }

  @Patch(':id/toggle')
  toggle(
    @RequestUser() user: { userId: string },
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ) {
    return this.todoService.toggleCompleted(user.userId, id, completed);
  }

  @Patch(':id/transfer-next-day')
  transferNextDay(
    @RequestUser() user: { userId: string },
    @Param('id') id: string,
  ) {
    return this.todoService.transferToNextDay(user.userId, id);
  }

  @Delete(':id')
  remove(@RequestUser() user: { userId: string }, @Param('id') id: string) {
    return this.todoService.remove(user.userId, id);
  }
}
