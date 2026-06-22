import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async create(
    author: UserEntity,
    data: CreateArticleDto,
  ): Promise<ArticleDto> {
    const articale = new ArticleEntity();
    articale.title = data.title;
    articale.text = data.text;
    articale.description = data.description;
    articale.tags = data.tags;
    articale.author = author.id;

    const res = await articale.save();

    return new ArticleDto(res);
  }

  async deleteById(id_author: number, id_article: number): Promise<void> {
    const articale = await this.articRepo
      .findOne({
        relations: ['author'],
        where: {
          author: id_author,
          id: id_article,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!articale) {
      throw new NotFoundException();
    }

    await this.articRepo.delete(articale.id);
  }

  async getById(id: number): Promise<ArticleDto> {
    const article = await this.articRepo
      .findOne({
        relations: ['author'],
        where: { id },
      })
      .catch(() => {
        throw new InternalServerErrorException();
      });

    if (!article) {
      throw new NotFoundException();
    }

    return new ArticleDto(article);
  }

  async getList(): Promise<ArticleDto[]> {
    const articles = await this.articRepo.find();

    return articles.map((item) => new ArticleDto(item));
  }

  async updateById(
    id_author: number,
    id_article: number,
    data: UpdateArticleDto,
  ): Promise<ArticleDto> {
    await this.articRepo
      .update(
        {
          author: id_author,
          id: id_article,
        },
        {
          description: data.description,
          tags: data.tags,
          text: data.text,
          title: data.title,
        },
      )
      .catch(() => {
        throw new InternalServerErrorException();
      });

    return await this.getById(id_article);
  }
}
