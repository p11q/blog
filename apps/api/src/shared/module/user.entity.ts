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
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { LikeEntity } from './like.entity';

export enum EUserRole {
  admin = 'admin',
  user = 'user',
}

@Entity('users')
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
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (item) => item.author)
  comments: CommentEntity[];

  @OneToMany(() => RefreshTokenEntity, (item) => item.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => LikeEntity, (item) => item.author)
  @JoinColumn({ name: 'like_id' })
  likes: number[];
}
