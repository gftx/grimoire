import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto';
import { Tokens } from './types/tokens.type';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto): Promise<Tokens> {
    return this.authService.refresh(dto.refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req: Request & { user: { userId: string } },
  ): Promise<void> {
    return this.authService.logout(req.user.userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @Req() req: Request & { user: { userId: string; role: string } },
  ): Promise<{
    userId: string;
    email: string;
    username: string;
    role: string;
  }> {
    return this.authService.getMe(req.user.userId);
  }
}
