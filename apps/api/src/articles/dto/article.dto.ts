import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UserEntity } from '~/shared/module/user.entity'; // добавьте импорт

export class ArticleDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  @IsDate()
  createAt: Date;

  @IsDate()
  updateAt: Date;
  author?: UserEntity;

  constructor(ent: ArticleEntity) {
    this.id = ent.id;
    this.title = ent.title;
    this.text = ent.text;
    this.description = ent.description;
    this.tags = ent.tags;
    this.createAt = ent.createAt;
    this.updateAt = ent.updateAt;
    this.author = ent.author;
  }
}
