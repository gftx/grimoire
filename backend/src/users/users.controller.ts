import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { JwtPayload } from '../auth/types/jwt-payload';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: JwtPayload) {
    return {
      id: user.sub,
      email: user.email,
      role: user.role,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('WARDEN') // только WARDEN может менять роли
  @Put('role')
  async updateRole(@Body() dto: { userId: string; role: Role }) {
    return this.prisma.user.update({
      where: { id: dto.userId },
      data: { role: dto.role },
    });
  }
}
