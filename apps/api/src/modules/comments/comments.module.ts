import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '~/shared/article.entity';
import { UserEntity } from '~/shared/user.entity';
import { AuthModule } from '~/modules/auth/auth.module';
import { CommentEntity } from '~/shared/comment.entity';

@Module({
  controllers: [CommentsController],
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, CommentEntity]),
    AuthModule,
  ],
  providers: [CommentsService],
})
export class CommentsModule {}
