import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import LikeService from './like.service';
import { User } from '~/libs/common/decorators/user.decorator';
import { AuthGuard } from '~/guards/auth.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  like(@User('id') id_author: number, @Param('id') id_article: number) {
    return this.likeService.togolLike(id_author, id_article);
  }

  @Get(':id')
  getList(@Param('id') id_article: number) {
    return this.likeService.getList(id_article);
  }
}
