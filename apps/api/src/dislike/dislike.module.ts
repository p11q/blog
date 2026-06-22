import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '~/auth/auth.module';
import { ArticleEntity } from '~/shared/module/article.entity';
import { DislikeEntity } from '~/shared/module/dislike.entity';
import { LikeEntity } from '~/shared/module/like.entity';
import { UserEntity } from '~/shared/module/user.entity';
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
