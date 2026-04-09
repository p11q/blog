import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

  const app_config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription("The blog's API description")
    .setVersion('1.0')
    .addTag('blog')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, app_config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors({
    origin: allowedOrigins,
    methods: config.getOrThrow<string>('CORS_METHODS'),
    credentials: true,
  });

  await app.listen(
    config.getOrThrow<number>('SERVER_PORT'),
    config.getOrThrow<string>('SERVER_HOST'),
  );
}
void bootstrap();
