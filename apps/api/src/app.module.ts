import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ArticalsModule } from './modules/articles/articles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { LikeModule } from './modules/like/like.module';
import { DislikeModule } from './modules/dislike/dislike.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ArticalsModule,
    AuthModule,
    CommentsModule,
    LikeModule,
    DislikeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UploadModule,
  ],
})
export class AppModule {}
