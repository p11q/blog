import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UploadEntity } from '~/shared/module/upload.entity';
import { AuthModule } from '~/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'node:path';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UploadEntity]),
    AuthModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './db/uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
