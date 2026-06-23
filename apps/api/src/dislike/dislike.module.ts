import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '~/auth/auth.module';
import { ArticleEntity } from '~/shared/article.entity';
import { DislikeEntity } from '~/shared/dislike.entity';
import { LikeEntity } from '~/shared/like.entity';
import { UserEntity } from '~/shared/user.entity';
import { DislikeController } from './dislike.controller';
import DislikeService from './dislike.service';

@Module({
  controllers: [DislikeController],
  imports: [
    TypeOrmModule.forFeature([
      DislikeEntity,
      LikeEntity,
      ArticleEntity,
      UserEntity,
    ]),
    AuthModule,
  ],
  providers: [DislikeService],
})
export class DislikeModule {}
