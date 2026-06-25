import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CommentEntity } from '~/shared/comment.entity';

export class CommentDto {
  @ApiProperty()
  article: number;

  @ApiProperty()
  author: number;

  @IsDate()
  createAt: Date;

  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;
  @IsDate()
  updateAt: Date;

  constructor(ent: CommentEntity) {
    this.id = ent.id;
    this.text = ent.text;
    this.createAt = ent.createAt;
    this.updateAt = ent.updateAt;
    this.author = ent.authorId;
    this.article = ent.article;
  }
}
