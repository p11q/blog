import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';
import { LikeEntity } from './like.entity';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => ArticleEntity, (item) => item.comments)
  @JoinColumn({ name: 'article_id' })
  article: ArticleEntity;

  @ManyToOne(() => UserEntity, (item) => item.comments)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  // @OneToMany(() => LikeEntity, (item) => item.comment)
  // @JoinColumn({ name: 'like_id' })
  // likes: number[];
}
