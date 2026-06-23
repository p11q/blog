import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DislikeEntity } from '~/shared/dislike.entity';
import { LikeEntity } from '~/shared/like.entity';

@Injectable()
export default class DislikeService {
  constructor(
    @InjectRepository(DislikeEntity)
    private readonly dislikeRepo: Repository<DislikeEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async getList(id_article: number): Promise<number> {
    return this.dislikeRepo.countBy({ articleId: id_article });
  }

  async toggleDislLike(id_author: number, id_article: number): Promise<string> {
    const isExistingDislike = await this.dislikeRepo.findOne({
      where: {
        articleId: id_article,
        userId: id_author,
      },
    });

    if (isExistingDislike) {
      await this.dislikeRepo.delete(isExistingDislike.id);

      return 'undislike';
    }

    const isExistingLike = await this.likeRepo.findOne({
      where: {
        articleId: id_article,
        userId: id_author,
      },
    });

    if (isExistingLike) {
      await this.likeRepo.delete(isExistingLike.id);
    }

    const new_dislike = this.dislikeRepo.create({
      articleId: id_article,
      userId: id_author,
    });
    await this.dislikeRepo.save(new_dislike);

    return 'dislike';
  }
}
