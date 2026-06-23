import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from '~/shared/article.entity';

export class ArticleDto {
  author?: number;

  @IsDate()
  createAt: Date;

  @IsString()
  @IsNotEmpty({ message: 'Полe description обязательно для заполнения.' })
  description: string;

  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Полe tags обязательно для заполнения.' })
  tags: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe title обязательно для заполнения.' })
  title: string;
  @IsDate()
  updateAt: Date;

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
