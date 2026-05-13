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
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/creat-article.dto';
import { AuthGuard } from '~/guards/auth.guard';
import { UserEntity } from '~/shared/module/user.entity';
import { User } from '~/libs/common/decorators/user.decorator';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from './dto/article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticalsController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Создание статьи' })
  @ApiParam({
    name: 'author',
    type: () => UserEntity,
  })
  @ApiParam({
    name: 'data',
    type: () => CreateArticleDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Созданная статья',
    type: ArticleDto,
  })
  @UseGuards(AuthGuard)
  create(@User() author: UserEntity, @Body() data: CreateArticleDto) {
    return this.service.create(author, data);
  }

  @Get()
  @ApiOperation({ summary: 'Вывод всех статей' })
  @ApiResponse({
    status: 200,
    type: ArticleDto,
  })
  getList() {
    return this.service.getList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Вывод статьи по ее индификатору' })
  @ApiParam({
    name: 'id',
    type: () => Number,
  })
  @ApiResponse({
    status: 200,
    type: ArticleDto,
  })
  @ApiResponse({
    status: 500,
    description: 'InternalServerErrorException',
  })
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Редактирование статиь по ее индификатору' })
  @ApiParam({
    name: 'id_author',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  @ApiParam({
    name: 'data',
    type: () => CreateArticleDto,
  })
  @ApiResponse({
    status: 200,
    type: ArticleDto,
  })
  @ApiResponse({
    status: 500,
    description: 'InternalServerErrorException',
  })
  @UseGuards(AuthGuard)
  updateById(
    @User('id') id_author: number,
    @Param('id') id_article: number,
    @Body() data: CreateArticleDto,
  ) {
    return this.service.updateById(id_author, id_article, data);
  }

  @Delete(':id')
  @Get(':id')
  @ApiOperation({ summary: 'Удаление статьи по ее индификатору' })
  @ApiParam({
    name: 'id_author',
    type: () => Number,
  })
  @ApiParam({
    name: 'id_article',
    type: () => Number,
  })
  @ApiResponse({
    status: 500,
    description: 'InternalServerErrorException',
  })
  @UseGuards(AuthGuard)
  deleteById(@User('id') id_author: number, @Param('id') id_article: number) {
    return this.service.deleteById(id_author, id_article);
  }
}
