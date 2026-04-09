import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ArticleEntity } from '~/shared/module/article.entity';
import { CommentEntity } from '~/shared/module/comment.entity';
import { UserEntity } from '~/shared/module/user.entity'; // добавьте импорт

export class CommentDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  @IsDate()
  createAt: Date;

  @ApiProperty()
  @IsDate()
  updateAt: Date;

  @ApiProperty()
  author?: UserEntity;

  @ApiProperty()
  article?: ArticleEntity;

  constructor(ent: CommentEntity) {
    this.id = ent.id;
    this.text = ent.text;
    this.createAt = ent.createAt;
    this.updateAt = ent.updateAt;
    this.author = ent.author;
    this.article = ent.article;
  }
}
