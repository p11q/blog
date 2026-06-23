import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/creat-comment.dto';
import { User } from '~/libs/common/decorators/user.decorator';
import { UserEntity } from '~/shared/user.entity';
import { AuthGuard } from '~/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { CommentEntity } from '~/shared/comment.entity';
import { CommentListItem } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Создание комментрария' })
  @ApiParam({
    name: 'author',
    type: () => UserEntity,
  })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  @ApiParam({
    name: 'data',
    type: () => CreateCommentDto,
  })
  @ApiResponse({
    description:
      'Если статьи с таким индификатором не существует (InternalServerErrorException)',
    status: 500,
  })
  @ApiResponse({
    description: 'CommentDto',
    example:
      ' id: number, text: string,  createAt: Date, updateAt: Data,  author?: UserEntity, article?: ArticleEntity',
    status: 200,
  })
  @UseGuards(AuthGuard)
  create(
    @User() author: UserEntity,
    @Param('id') id_article: number,
    @Body() data: CreateCommentDto,
  ): Promise<CommentDto> {
    return this.commentsService.create(author, id_article, data);
  }

  @Delete(':id_article/:id_comment')
  @ApiOperation({ summary: 'Редактирование комментрария' })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_comment',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_author',
    type: () => Number,
  })
  @ApiResponse({
    description:
      'Если удаление статьи производит не ее автор или не пользователь с ролью Admin (InternalServerErrorException)',
    status: 500,
  })
  @UseGuards(AuthGuard)
  deleteById(
    @Param('id_article') id_article: number,
    @Param('id_comment') id_comment: number,
    @User('id') id_author: number,
  ): Promise<void> {
    return this.commentsService.deleteById(id_article, id_comment, id_author);
  }

  @Get(':id_article')
  @ApiOperation({ summary: 'Вывод комментариев статьи' })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  getList(@Param('id_article') id_article: number): Promise<CommentListItem[]> {
    return this.commentsService.getList(id_article);
  }

  @Put(':id_article/:id_comment')
  @ApiOperation({ summary: 'Редактирование комментрария' })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_comment',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_author',
    type: () => Number,
  })
  @ApiParam({
    name: 'data',
    type: () => UpdateCommentDto,
  })
  @ApiResponse({
    description:
      'Если редактирование статьи производит не ее автор или не пользователь с ролью Admin (InternalServerErrorException)',
    status: 500,
  })
  @ApiResponse({
    description: 'CommentDto',
    example:
      ' id: number, text: string,  createAt: Date, updateAt: Data,  author?: UserEntity, article?: ArticleEntity',
    status: 200,
  })
  @UseGuards(AuthGuard)
  updateById(
    @Param('id_article') id_article: number,
    @Param('id_comment') id_comment: number,
    @User('id') id_author: number,
    @Body() data: UpdateCommentDto,
  ): Promise<CommentEntity | null> {
    return this.commentsService.updateById(
      id_article,
      id_comment,
      id_author,
      data,
    );
  }
}
