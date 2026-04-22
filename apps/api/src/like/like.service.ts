import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { LikeEntity } from '~/shared/module/likes.entity';
import { UserEntity } from '~/shared/module/user.entity';

@Injectable()
export default class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private readonly likeRepo: Repository<LikeEntity>,
  ) {}

  async togolLike(id_author: number, id_article: number) {
    const isExisting = await this.likeRepo.findOne({
      where: {
        userId: id_author,
        articleId: id_article,
      },
    });
    console.log(
      `user_id ${isExisting?.userId} and article_id ${isExisting?.articleId}`,
    );
    if (isExisting) {
      await this.likeRepo.delete(isExisting.id);
      return 'unlike';
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
