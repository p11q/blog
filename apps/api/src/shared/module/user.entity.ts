import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from './article.entity';
import { RefreshTokenEntity } from './refresh-token.entity';
import { CommentEntity } from './comment.entity';
import { IsNumber } from 'class-validator';

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
  name: string;

  @Column()
  email: string;

  @Column()
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
}
