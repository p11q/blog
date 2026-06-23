import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticalsController } from './articels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '~/shared/article.entity';
import { UserEntity } from '~/shared/user.entity';
import { AuthModule } from '~/auth/auth.module';

@Module({
  controllers: [ArticalsController],
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity]), AuthModule],
  providers: [ArticlesService],
})
export class ArticalsModule {}
