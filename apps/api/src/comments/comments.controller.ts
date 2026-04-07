import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { Article } from '~/libs/common/decorators/article.decorator';
import { User } from '~/libs/common/decorators/user.decorator';
import { UserEntity } from '~/shared/module/user.entity';
import { ArticleEntity } from '~/shared/module/article.entity';
import { AuthGuard } from '~/guards/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  create(
    @Param('id') id_article: number,
    @User() author: UserEntity,
    @Body() data: CreateCommentDto,
  ) {
    return this.commentsService.create(author, id_article, data);
  }

  @Put(':id_article/:id_comment')
  @UseGuards(AuthGuard)
  updateById(
    @Param('id_article') id_article: number,
    @Param('id_comment') id_comment: number,
    @User('id') id_author: number,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentsService.updateById(
      id_article,
      id_comment,
      id_author,
      data,
    );
  }

  @Delete(':id_article/:id_comment')
  @UseGuards(AuthGuard)
  deleteById(
    @Param('id_article') id_article: number,
    @Param('id_comment') id_comment: number,
    @User('id') id_author: number,
    @Body() data: UpdateCommentDto,
  ) {
    return this.commentsService.deleteById(id_article, id_comment, id_author);
  }
}
