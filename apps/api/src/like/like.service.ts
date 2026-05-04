import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DislikeEntity } from '~/shared/module/dislike.entity';
import { LikeEntity } from '~/shared/module/likes.entity';

@Injectable()
export default class LikeService {
  constructor(
    @InjectRepository(DislikeEntity)
    private readonly dislikeRepo: Repository<DislikeEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async togglelLike(id_author: number, id_article: number) {
    const isExistingLike = await this.likeRepo.findOne({
      where: {
        userId: id_author,
        articleId: id_article,
      },
    });

    if (isExistingLike) {
      await this.likeRepo.delete(isExistingLike.id);
      return 'unlike';
    }

    const isExistingDisike = await this.dislikeRepo.findOne({
      where: {
        userId: id_author,
        articleId: id_article,
      },
    });

    if (isExistingDisike) {
      await this.dislikeRepo.delete(isExistingDisike.id);
    }

    const new_like = this.likeRepo.create({
      userId: id_author,
      articleId: id_article,
    });
    await this.likeRepo.save(new_like);
    return 'like';
  }

  async getList(id_article: number) {
    return this.likeRepo.countBy({ articleId: id_article });
  }
}
