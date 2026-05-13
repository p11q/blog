import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CommentEntity } from './comment.entity';
import { IsNumber, IsString } from 'class-validator';
import { LikeEntity } from './like.entity';
import { DislikeEntity } from './dislike.entity';

export enum EUserRole {
  admin = 'admin',
  user = 'user',
}

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ enum: EUserRole, default: EUserRole.user })
  role: EUserRole;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => ArticleEntity, (item) => item.author)
  @JoinColumn({ name: 'article_id' })
  articles: number[];

  @OneToMany(() => CommentEntity, (item) => item.author)
  @JoinColumn({ name: 'comment_id' })
  comments: number[];

  @OneToMany(() => LikeEntity, (item) => item.author)
  @JoinColumn({ name: 'like_id' })
  likes: number[];

  @OneToMany(() => DislikeEntity, (item) => item.author)
  @JoinColumn({ name: 'dislike_id' })
  dislikes: number[];

  @OneToMany(() => RefreshTokenEntity, (item) => item.user)
  refreshTokens: RefreshTokenEntity[];
}
