import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticalsController } from './articels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UserEntity } from '~/shared/module/user.entity';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity]), AuthModule],
  providers: [ArticlesService],
  controllers: [ArticalsController],
})
export class ArticalsModule {}
