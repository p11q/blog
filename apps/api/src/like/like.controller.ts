import { Controller, Get, Param, Post } from '@nestjs/common';
import LikeService from './like.service';
import { User } from '~/libs/common/decorators/user.decorator';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  like(@User('id') id_author: number, @Param('id') id_article: number) {
    return this.likeService.togolLike(id_author, id_article);
  }

  @Get(':id')
  getList(@Param('id') id_article: number) {
    return this.likeService.getList(id_article);
  }
}
