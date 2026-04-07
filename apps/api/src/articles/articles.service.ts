import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateArticleDto } from './dto/creat-article.dto';
import { ArticleDto } from './dto/article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '~/shared/module/article.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '~/shared/module/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articRepo: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(author: UserEntity, data: CreateArticleDto) {
    const articale = new ArticleEntity();
    articale.title = data.title;
    articale.text = data.text;
    articale.description = data.description;
    articale.tags = data.tags;
    articale.author = author;

    const res = await articale.save();

    return new ArticleDto(res);
  }

  async getList() {
    const articles = await this.articRepo.find();

    return articles.map((item) => new ArticleDto(item));
  }

  async getById(id: number) {
    const article = await this.articRepo
      .findOne({
        where: { id },
        relations: ['author'],
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return new ArticleDto(article);
  }

  async updateById(
    id_author: number,
    id_article: number,
    data: UpdateArticleDto,
  ) {
    await this.articRepo
      .update(
        {
          id: id_article,
          author: {
            id: id_author,
          },
        },
        {
          title: data.title,
          text: data.text,
          description: data.description,
          tags: data.tags,
        },
      )
      .catch(() => {
        throw new InternalServerErrorException();
      });
    return await this.getById(id_article);
  }

  async deleteById(id_author: number, id_article: number) {
    const articale = await this.articRepo
      .findOne({
        where: {
          id: id_article,
          author: {
            id: id_author,
          },
        },
        relations: ['author'],
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });
    await this.articRepo.delete(articale.id);
  }
}
