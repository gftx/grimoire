import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types/tokens.type';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: hashedPassword,
        role: Role.SCRIBE,
      },
    });

    return this.issueTokensAndSave(user.id, user.role);
  }

  async getMe(userId: string): Promise<{
    userId: string;
    email: string;
    username: string;
    role: string;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokensAndSave(user.id, user.role);
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    const payload = await this.jwtService.verifyAsync<{ sub: string }>(
      refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }

    return this.issueTokensAndSave(user.id, user.role);
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private async issueTokensAndSave(
    userId: string,
    role: Role,
  ): Promise<Tokens> {
    const tokens = await this.issueTokens(userId, role);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  private async issueTokens(userId: string, role: Role): Promise<Tokens> {
    const payload = { sub: userId, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
