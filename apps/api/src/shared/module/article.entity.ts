import { ApiProperty } from '@nestjs/swagger';
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
import { CommentEntity } from './comment.entity';
import { DislikeEntity } from './dislike.entity';
import { LikeEntity } from './like.entity';
import { UploadEntity } from './upload.entity';
import { UserEntity } from './user.entity';

@Entity('articles')
export class ArticleEntity extends BaseEntity {
  @ApiProperty({
    description: 'Индификатор статьи',
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Заголовок статьи',
    example: 'Случай из моей жизни ...',
    type: () => String,
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Основное содержание статьи',
    type: () => String,
  })
  @Column()
  text: string;

  @ApiProperty({
    description: 'Краткое описание статьи',
    type: () => String,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Тэги по которым будут находить статью',
    example: '#life#style',
    type: () => String,
  })
  @Column({ nullable: true })
  tags: string;

  @ApiProperty({
    description: 'Дата создания статьи',
    type: () => Date,
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @ApiProperty({
    description: 'Дата обновления содержания статьи',
    type: () => Date,
  })
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ApiProperty({
    description: 'Индификатор пользователя, который является автором статьи',
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, (item) => item.articles)
  @JoinColumn({ name: 'user_id' })
  author: number;

  @ApiProperty({
    description: 'Индификаторы комментариев, которые сделаны под статьей',
    type: () => CommentEntity,
  })
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
