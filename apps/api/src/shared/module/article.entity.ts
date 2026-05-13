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
import { CommentEntity } from './comment.entity';
import { LikeEntity } from './like.entity';
import { DislikeEntity } from './dislike.entity';
import { UploadEntity } from './upload.entity';

@Entity('articles')
export class ArticleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tags: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (item) => item.articles)
  @JoinColumn({ name: 'user_id' })
  author: number;

  @OneToMany(() => CommentEntity, (item) => item.article)
  @JoinColumn({ name: 'comment_id' })
  comments: number[];

  @OneToMany(() => LikeEntity, (item) => item.article)
  @JoinColumn({ name: 'like_id' })
  likes: number[];

  @OneToMany(() => DislikeEntity, (item) => item.article)
  @JoinColumn({ name: 'dislike_id' })
  dislikes: number[];

  @OneToMany(() => UploadEntity, (item) => item.article)
  @JoinColumn({ name: 'file_id' })
  files: number[];
}
