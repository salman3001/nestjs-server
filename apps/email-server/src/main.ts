import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EmailServerModule } from './email-server.module';

async function bootstrap() {
  const app = await NestFactory.create(EmailServerModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:4000',
      'http://localhost:5173',
      'https://salman3001.github.io',
    ],
    // credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(4000);
}
bootstrap();
