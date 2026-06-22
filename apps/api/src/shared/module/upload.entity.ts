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

@Entity('upload')
export class UploadEntity extends BaseEntity {
  @ManyToOne(() => ArticleEntity, (item) => item.files)
  @JoinColumn({ name: 'article_id' })
  article: number;

  @Column({ name: 'article_id' })
  articleId: number;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
