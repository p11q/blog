import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UserEntity } from '~/shared/module/user.entity'; // добавьте импорт

export class ArticleDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Полe title обязательно для заполнения.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe description обязательно для заполнения.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe tags обязательно для заполнения.' })
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
