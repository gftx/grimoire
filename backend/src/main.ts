import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3001;

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
