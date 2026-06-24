import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
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
import { CommentEntity } from './comment.entity';
import { DislikeEntity } from './dislike.entity';
import { LikeEntity } from './like.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

export enum EUserRole {
  admin = 'admin',
  user = 'user',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty({
    description: 'Индификаторы статей, которые создал пользователь',
    type: () => ArticleEntity,
  })
  @OneToMany(() => ArticleEntity, (item) => item.author)
  @JoinColumn({ name: 'article_id' })
  articles: number[];

  @ApiProperty({
    description: 'Индификаторы комментариев, которые создал пользователь',
    type: () => CommentEntity,
  })
  @OneToMany(() => CommentEntity, (item) => item.author)
  @JoinColumn({ name: 'comment_id' })
  comments: number[];

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: () => Date,
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @OneToMany(() => DislikeEntity, (item) => item.author)
  @JoinColumn({ name: 'dislike_id' })
  dislikes: number[];

  @ApiProperty({
    description: 'Email пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  icon: string;

  @ApiProperty({
    description: 'Индификатор пользователя',
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @OneToMany(() => LikeEntity, (item) => item.author)
  @JoinColumn({ name: 'like_id' })
  likes: number[];

  @ApiProperty({
    description: 'Имя пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  password: string;

  @ApiProperty({ type: () => RefreshTokenEntity })
  @OneToMany(() => RefreshTokenEntity, (item) => item.user)
  refreshTokens: RefreshTokenEntity[];

  @ApiProperty({
    description: 'Роль пользователя',
    enum: ['admin', 'user'],
    type: () => EUserRole,
  })
  @Column({ default: EUserRole.user, enum: EUserRole })
  role: EUserRole;

  @ApiProperty({
    description: 'Дата обновления информации о пользователе',
    type: () => Date,
  })
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
