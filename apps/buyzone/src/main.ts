import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { BuyzoneModule } from './buyzone.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(BuyzoneModule);
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('2.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'));
  app.setGlobalPrefix('api', { exclude: ['/'] });

  await app.listen(3000);
}
bootstrap();
