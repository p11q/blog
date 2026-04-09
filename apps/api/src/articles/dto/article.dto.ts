import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from '~/shared/module/article.entity';
import { UserEntity } from '~/shared/module/user.entity'; // добавьте импорт

export class ArticleDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tags: string;

  @ApiProperty()
  @IsDate()
  createAt: Date;

  @ApiProperty()
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
