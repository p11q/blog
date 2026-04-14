import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @ApiProperty({
    description: 'Индификатор комментария',
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Основной текст комментария',
    type: () => String,
  })
  @Column()
  text: string;

  @ApiProperty({
    description: 'Дата создания комментария',
    type: () => Date,
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @ApiProperty({
    description: 'Дата обновления содержания комментария',
    type: () => Date,
  })
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ApiProperty({
    description: 'Индификатор статьи, под которым оставлен комментарий',
    type: () => ArticleEntity,
  })
  @ManyToOne(() => ArticleEntity, (item) => item.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ApiProperty({
    description: 'Индификатор авторая, который оставил комментарий',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (item) => item.comments)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;
}
