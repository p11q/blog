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

@Controller('articles')
export class ArticalsController {
  constructor(private readonly service: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@User() author: UserEntity, @Body() data: CreateArticleDto) {
    return this.service.create(author, data);
  }

  @Get()
  getList() {
    return this.service.getList();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateById(
    @User('id') id_author: number,
    @Param('id') id_article: number,
    @Body() data: CreateArticleDto,
  ) {
    return this.service.updateById(id_author, id_article, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteById(@User('id') id_author: number, @Param('id') id_article: number) {
    return this.service.deleteById(id_author, id_article);
  }
}
