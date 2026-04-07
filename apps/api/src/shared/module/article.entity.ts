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
  author: UserEntity;

  @OneToMany(() => CommentEntity, (item) => item.article)
  @JoinColumn({ name: 'comments_id' })
  comments: CommentEntity[];
}
