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
import { ArticleEntity } from './article.entity';
import { UserEntity } from './user.entity';

@Entity('dislike')
export class DislikeEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, (item) => item.dislikes)
  @JoinColumn({ name: 'article_id' })
  article: number;

  @Column({ name: 'article_id' })
  articleId: number; // ← явная колонка

  @ManyToOne(() => UserEntity, (item) => item.dislikes)
  @JoinColumn({ name: 'user_id' })
  author: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @Column({ name: 'user_id' })
  userId: number; // ← явная колонка
}
