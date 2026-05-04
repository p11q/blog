import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '~/libs/common/decorators/user.decorator';
import { AuthGuard } from '~/guards/auth.guard';
import DislikeService from './dislike.service';

@Controller('dislike')
export class DislikeController {
  constructor(private readonly dislikeService: DislikeService) {}

  @Post(':id')
  @UseGuards(AuthGuard)
  dislike(@User('id') id_author: number, @Param('id') id_article: number) {
    return this.dislikeService.toggleDislLike(id_author, id_article);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getList(@Param('id') id_article: number) {
    return this.dislikeService.getList(id_article);
  }
}
