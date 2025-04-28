import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateIdeaDto } from './dto/create-idea.dto';
import { UpdateIdeaDto } from './dto/update-idea.dto';

@Injectable()
export class IdeaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateIdeaDto) {
    return this.prisma.idea.create({
      data: {
        ...dto,
        authorId: userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.idea.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, ideaId: string) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea || idea.authorId !== userId) {
      throw new NotFoundException('Idea not found.');
    }

    return idea;
  }

  async update(userId: string, ideaId: string, dto: UpdateIdeaDto) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea || idea.authorId !== userId) {
      throw new ForbiddenException('You do not have access to this idea.');
    }

    return this.prisma.idea.update({
      where: { id: ideaId },
      data: { ...dto },
    });
  }

  async remove(userId: string, ideaId: string) {
    const idea = await this.prisma.idea.findUnique({
      where: { id: ideaId },
    });

    if (!idea || idea.authorId !== userId) {
      throw new ForbiddenException('You do not have access to this idea.');
    }

    return this.prisma.idea.delete({
      where: { id: ideaId },
    });
  }
}
