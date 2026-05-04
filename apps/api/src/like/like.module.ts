import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import LikeService from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from '~/shared/module/likes.entity';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UserEntity } from '~/shared/module/user.entity';
import { AuthModule } from '~/auth/auth.module';
import { DislikeEntity } from '~/shared/module/dislike.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DislikeEntity,
      LikeEntity,
      ArticleEntity,
      UserEntity,
    ]),
    AuthModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
