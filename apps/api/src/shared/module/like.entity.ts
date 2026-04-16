import {
  Entity,
  BaseEntity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';

@Entity('like')
export class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (item) => item.likes)
  @JoinColumn({ name: 'user_id' })
  author: number;

  @ManyToOne(() => ArticleEntity, (item) => item.likes)
  @JoinColumn({ name: 'article_id' })
  article: number;

  // @ManyToOne(() => CommentEntity, (item) => item.likes)
  // @JoinColumn({ name: 'comment_id' })
  // comment: number;
}
