import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UploadEntity } from '~/shared/module/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articRepo: Repository<ArticleEntity>,
  ) {}

  async uploadFile(
    id_author: number,
    id_article: number,
    file: Express.Multer.File,
  ) {
    const article = await this.articRepo
      .findOne({
        where: {
          id: id_article,
          author: id_author,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    const new_file = new UploadEntity();
    new_file.path = file.path;
    new_file.article = article.id;

    new_file.save();

    return article;
  }
}
