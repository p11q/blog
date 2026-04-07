import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const config = app.get(ConfigService);

  await app.listen(
    config.getOrThrow<number>('SERVER_PORT'),
    config.getOrThrow<string>('SERVER_HOST'),
  );
}
void bootstrap();
