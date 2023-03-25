import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:5173',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'uploads'));

  await app.listen(4000);
}
bootstrap();
