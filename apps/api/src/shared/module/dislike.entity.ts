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

@Entity('dislikes')
export class DislikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number; // ← явная колонка

  @Column({ name: 'article_id' })
  articleId: number; // ← явная колонка

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (item) => item.dislikes)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  @ManyToOne(() => ArticleEntity, (item) => item.dislikes)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  // @ManyToOne(() => CommentEntity, (item) => item.likes)
  // @JoinColumn({ name: 'comment_id' })
  // comment: number;
}
