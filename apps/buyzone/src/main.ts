import { NestFactory } from '@nestjs/core';
// import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BuyzoneModule } from './buyzone.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BuyzoneModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('6.2.1')
    .addTag('buyzone')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
  // app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'uploads'));

  await app.listen(4000);
}
bootstrap();
