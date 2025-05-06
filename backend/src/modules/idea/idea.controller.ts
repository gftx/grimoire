import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { Request } from 'express';

@Controller('ideas')
@UseGuards(JwtAuthGuard)
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  async create(@Req() req: Request, @Body() dto: CreateIdeaDto) {
    const userId = (req.user as { userId: string }).userId;
    return this.ideaService.create(userId, dto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = (req.user as { userId: string }).userId;
    return this.ideaService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const userId = (req.user as { userId: string }).userId;
    return this.ideaService.findOne(userId, id);
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateIdeaDto,
  ) {
    const userId = (req.user as { userId: string }).userId;
    return this.ideaService.update(userId, id, dto);
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    const userId = (req.user as { userId: string }).userId;
    return this.ideaService.remove(userId, id);
  }
}
