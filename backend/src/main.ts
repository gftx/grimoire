import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RolesGuard } from './common/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3001;

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  const reflector = app.get(Reflector);

  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  await app.listen(port);
}
bootstrap();
