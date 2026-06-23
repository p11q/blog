import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { basename } from 'node:path';
import { Repository } from 'typeorm';
import { ArticleEntity } from '~/shared/article.entity';
import { UploadEntity } from '~/shared/upload.entity';

export interface UploadDto {
  id: number;
  url: string;
}

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articRepo: Repository<ArticleEntity>,
    @InjectRepository(UploadEntity)
    private readonly uploadRepo: Repository<UploadEntity>,
  ) {}

  async getList(id_article: number): Promise<UploadDto[]> {
    const uploads = await this.uploadRepo.find({
      order: { createAt: 'ASC' },
      where: { articleId: id_article },
    });

    return uploads.map((upload) => this.toDto(upload));
  }

  async uploadFile(
    id_author: number,
    id_article: number,
    file: Express.Multer.File,
  ): Promise<UploadDto> {
    const article = await this.articRepo
      .findOne({
        where: {
          author: id_author,
          id: id_article,
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

  private toDto(upload: UploadEntity): UploadDto {
    return {
      id: upload.id,
      url: `uploads/${basename(upload.path)}`,
    };
  }
}
