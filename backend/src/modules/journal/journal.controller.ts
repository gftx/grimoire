import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import { CreateJournalItemDto } from './dto/create-journal-item.dto';
import { UpdateJournalItemDto } from './dto/update-journal-item.dto';
import { JwtAuthGuard } from '../../guards/jwt.auth.guard';
import { RequestUser } from '../../common/decorators/request-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(
    @RequestUser() user: { userId: string },
    @Body() dto: CreateJournalItemDto,
  ) {
    return this.journalService.create(user.userId, dto);
  }

  @Get()
  findAll(
    @RequestUser() user: { userId: string },
    @Query('date') date?: string,
  ) {
    return this.journalService.findAll(user.userId, date);
  }

  @Get(':id')
  findOne(@RequestUser() user: { userId: string }, @Param('id') id: string) {
    return this.journalService.findOne(user.userId, id);
  }

  @Patch(':id')
  update(
    @RequestUser() user: { userId: string },
    @Param('id') id: string,
    @Body() dto: UpdateJournalItemDto,
  ) {
    return this.journalService.update(user.userId, id, dto);
  }

  @Delete(':id')
  remove(@RequestUser() user: { userId: string }, @Param('id') id: string) {
    return this.journalService.remove(user.userId, id);
  }
}
