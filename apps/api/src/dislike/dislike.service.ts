import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DislikeEntity } from '~/shared/module/dislike.entity';
import { LikeEntity } from '~/shared/module/likes.entity';

@Injectable()
export default class DislikeService {
  constructor(
    @InjectRepository(DislikeEntity)
    private readonly dislikeRepo: Repository<DislikeEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async toggleDislLike(id_author: number, id_article: number) {
    const isExistingDislike = await this.dislikeRepo.findOne({
      where: {
        userId: id_author,
        articleId: id_article,
      },
    });

    if (isExistingDislike) {
      await this.dislikeRepo.delete(isExistingDislike.id);
      return 'undislike';
    }

    const isExistingLike = await this.likeRepo.findOne({
      where: {
        userId: id_author,
        articleId: id_article,
      },
    });

    if (isExistingLike) {
      await this.likeRepo.delete(isExistingLike.id);
    }

    const new_dislike = this.dislikeRepo.create({
      userId: id_author,
      articleId: id_article,
    });
    await this.dislikeRepo.save(new_dislike);
    return 'dislike';
  }

  async getList(id_article: number) {
    return this.dislikeRepo.countBy({ articleId: id_article });
  }
}
