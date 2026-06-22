import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '~/auth/auth.module';
import { ArticleEntity } from '~/shared/module/article.entity';
import { DislikeEntity } from '~/shared/module/dislike.entity';
import { LikeEntity } from '~/shared/module/like.entity';
import { UserEntity } from '~/shared/module/user.entity';
import { LikeController } from './like.controller';
import LikeService from './like.service';

@Module({
  controllers: [LikeController],
  imports: [
    TypeOrmModule.forFeature([
      DislikeEntity,
      LikeEntity,
      ArticleEntity,
      UserEntity,
    ]),
    AuthModule,
  ],
  providers: [LikeService],
})
export class LikeModule {}
