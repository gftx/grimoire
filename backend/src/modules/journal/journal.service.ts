import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateJournalItemDto } from './dto/create-journal-item.dto';
import { UpdateJournalItemDto } from './dto/update-journal-item.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class JournalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateJournalItemDto) {
    return this.prisma.journalEntry.create({
      data: {
        ...dto,
        date: new Date(dto.date),
        userId,
      },
    });
  }

  async findAll(userId: string, date?: string) {
    const where: Prisma.JournalEntryWhereInput = { userId };
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.date = { gte: start, lte: end };
    }
    return this.prisma.journalEntry.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const entry = await this.prisma.journalEntry.findUnique({
      where: { id },
    });
    if (!entry || entry.userId !== userId) {
      throw new NotFoundException('Journal entry not found.');
    }
    return entry;
  }

  async update(userId: string, id: string, dto: UpdateJournalItemDto) {
    const entry = await this.prisma.journalEntry.findUnique({
      where: { id },
    });
    if (!entry || entry.userId !== userId) {
      throw new ForbiddenException(
        'You do not have access to this journal entry.',
      );
    }
    return this.prisma.journalEntry.update({
      where: { id },
      data: {
        ...dto,
        date: dto.date ? new Date(dto.date) : undefined,
      },
    });
  }

  async remove(userId: string, id: string) {
    const entry = await this.prisma.journalEntry.findUnique({
      where: { id },
    });
    if (!entry || entry.userId !== userId) {
      throw new ForbiddenException(
        'You do not have access to this journal entry.',
      );
    }
    return this.prisma.journalEntry.delete({
      where: { id },
    });
  }
}
