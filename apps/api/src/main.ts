import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'db', 'uploads'), {
    prefix: '/uploads/',
  });

  const config = app.get(ConfigService);

  const app_config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription("The blog's API description")
    .setVersion('1.0')
    .addTag('blog')
    .build();

  const document = SwaggerModule.createDocument(app, app_config);
  SwaggerModule.setup('api', app, document);

  writeFileSync(
    resolve(process.cwd(), 'openapi.json'),
    JSON.stringify(document, null, 2),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    credentials: true,
    methods: config.getOrThrow<string>('CORS_METHODS'),
    origin: config.getOrThrow<string>('CORS_ORIGINS'),
  });

  await app.listen(
    config.getOrThrow<number>('SERVER_PORT'),
    config.getOrThrow<string>('SERVER_HOST'),
  );
}

void bootstrap();
