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
import { LikeEntity } from './likes.entity';
import { DislikeEntity } from './dislike.entity';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum EUserRole {
  admin = 'admin',
  user = 'user',
}

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty({
    description: 'Индификатор пользователя',
    type: () => Number,
  })
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Имя пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    type: () => String,
  })
  @Column()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Роль пользователя',
    enum: ['admin', 'user'],
    type: () => EUserRole,
  })
  @Column({ enum: EUserRole, default: EUserRole.user })
  role: EUserRole;

  @ApiProperty({
    description: 'Дата создания пользователя',
    type: () => Date,
  })
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @ApiProperty({
    description: 'Дата обновления информации о пользователе',
    type: () => Date,
  })
  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @ApiProperty({
    description: 'Индификаторы статей, которые создал пользователь',
    type: () => ArticleEntity,
  })
  @OneToMany(() => ArticleEntity, (item) => item.author)
  articles: ArticleEntity[];

  @ApiProperty({
    description: 'Индификаторы комментариев, которые создал пользователь',
    type: () => CommentEntity,
  })
  @OneToMany(() => CommentEntity, (item) => item.author)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (item) => item.author)
  likes: number[];

  @OneToMany(() => DislikeEntity, (item) => item.author)
  dislikes: number[];

  @ApiProperty({ type: () => RefreshTokenEntity })
  @OneToMany(() => RefreshTokenEntity, (item) => item.user)
  refreshTokens: RefreshTokenEntity[];
}
