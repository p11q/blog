import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseEntity {
  @ApiProperty({ type: () => Date })
  @Column()
  expires: Date;

  @ApiProperty({ type: () => String })
  @PrimaryColumn()
  token: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user' })
  user: UserEntity;
}
