import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { LikeEntity } from '~/shared/module/like.entity';
import { UserEntity } from '~/shared/module/user.entity';

@Injectable()
export default class LikeService {
  constructor(
    private readonly likeRepo: Repository<LikeEntity>,
    private readonly userRepo: Repository<UserEntity>,
    private readonly articleRepo: Repository<ArticleEntity>,
  ) {}

  async togolLike(id_author: number, id_article: number) {
    const isExisting = await this.likeRepo.findOne({
      where: {
        article: id_article,
        author: id_author,
      },
    });

    if (isExisting) {
      await this.likeRepo.delete(isExisting.id);
      await this.userRepo.delete({ likes: isExisting.id });
      await this.articleRepo.delete({ likes: isExisting.id });
    }

    this.likeRepo
      .create({
        article: id_article,
        author: id_author,
      })
      .save();
  }

  async getList(id_article: number) {
    return this.likeRepo.countBy({ article: id_article });
  }
}
