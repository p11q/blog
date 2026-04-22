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

@Entity('likes')
export class LikeEntity extends BaseEntity {
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

  @ManyToOne(() => UserEntity, (item) => item.likes)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  @ManyToOne(() => ArticleEntity, (item) => item.likes)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  // @ManyToOne(() => CommentEntity, (item) => item.likes)
  // @JoinColumn({ name: 'comment_id' })
  // comment: number;
}
