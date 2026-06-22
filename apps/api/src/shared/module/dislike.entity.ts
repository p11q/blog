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
  author: number;

  @ManyToOne(() => ArticleEntity, (item) => item.dislikes)
  @JoinColumn({ name: 'article_id' })
  article: number;
}
