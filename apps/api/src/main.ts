import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: config.getOrThrow<string>('CORS_ORIGINS'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(
    config.getOrThrow<number>('SERVER_PORT'),
    config.getOrThrow<string>('SERVER_HOST'),
  );
}
void bootstrap();
