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
import { User } from '~/libs/common/decorators/user.decorator';
import { UserEntity } from '~/shared/module/user.entity';
import { AuthGuard } from '~/guards/auth.guard';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SignUpDto } from '~/auth/dto/sign-up.dto';
import { CommentDto } from './dto/comment.dto';

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
    status: 500,
    description:
      'Если статьи с таким индификатором не существует (InternalServerErrorException)',
  })
  @ApiResponse({
    status: 200,
    description: 'CommentDto',
    example:
      ' id: number, text: string,  createAt: Date, updateAt: Data,  author?: UserEntity, article?: ArticleEntity',
  })
  @UseGuards(AuthGuard)
  create(
    @User() author: UserEntity,
    @Param('id') id_article: number,
    @Body() data: CreateCommentDto,
  ) {
    return this.commentsService.create(author, id_article, data);
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
    status: 500,
    description:
      'Если редактирование статьи производит не ее автор или не пользователь с ролью Admin (InternalServerErrorException)',
  })
  @ApiResponse({
    status: 200,
    description: 'CommentDto',
    example:
      ' id: number, text: string,  createAt: Date, updateAt: Data,  author?: UserEntity, article?: ArticleEntity',
  })
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
    status: 500,
    description:
      'Если удаление статьи производит не ее автор или не пользователь с ролью Admin (InternalServerErrorException)',
  })
  @UseGuards(AuthGuard)
  deleteById(
    @Param('id_article') id_article: number,
    @Param('id_comment') id_comment: number,
    @User('id') id_author: number,
  ) {
    return this.commentsService.deleteById(id_article, id_comment, id_author);
  }
}
