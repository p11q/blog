import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DislikeEntity } from '~/shared/dislike.entity';
import { LikeEntity } from '~/shared/like.entity';

@Injectable()
export default class LikeService {
  constructor(
    @InjectRepository(DislikeEntity)
    private readonly dislikeRepo: Repository<DislikeEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async getList(id_article: number): Promise<number> {
    return this.likeRepo.countBy({ articleId: id_article });
  }

  async togglelLike(id_author: number, id_article: number): Promise<string> {
    const isExistingLike = await this.likeRepo.findOne({
      where: {
        articleId: id_article,
        userId: id_author,
      },
    });

    if (isExistingLike) {
      await this.likeRepo.delete(isExistingLike.id);

      return 'unlike';
    }

    const isExistingDisike = await this.dislikeRepo.findOne({
      where: {
        articleId: id_article,
        userId: id_author,
      },
    });

    if (isExistingDisike) {
      await this.dislikeRepo.delete(isExistingDisike.id);
    }

    const new_like = this.likeRepo.create({
      articleId: id_article,
      userId: id_author,
    });
    await this.likeRepo.save(new_like);

    return 'like';
  }
}
