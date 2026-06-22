import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { basename } from 'node:path';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UploadEntity } from '~/shared/module/upload.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articRepo: Repository<ArticleEntity>,
    @InjectRepository(UploadEntity)
    private readonly uploadRepo: Repository<UploadEntity>,
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

    if (!article) {
      throw new InternalServerErrorException();
    }

    const upload = new UploadEntity();
    upload.path = file.path;
    upload.articleId = article.id;

    const saved = await upload.save();

    return this.toDto(saved);
  }

  async getList(id_article: number) {
    const uploads = await this.uploadRepo.find({
      where: { articleId: id_article },
      order: { createAt: 'ASC' },
    });

    return uploads.map((upload) => this.toDto(upload));
  }

  private toDto(upload: UploadEntity) {
    return {
      id: upload.id,
      url: `uploads/${basename(upload.path)}`,
    };
  }
}
