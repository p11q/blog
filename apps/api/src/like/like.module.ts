import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '~/auth/auth.module';
import { ArticleEntity } from '~/shared/article.entity';
import { DislikeEntity } from '~/shared/dislike.entity';
import { LikeEntity } from '~/shared/like.entity';
import { UserEntity } from '~/shared/user.entity';
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
