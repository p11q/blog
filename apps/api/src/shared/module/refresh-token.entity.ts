import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('refresh_token')
export class RefreshTokenEntity extends BaseEntity {
  @ApiProperty({ type: () => String })
  @PrimaryColumn()
  token: string;

  @ApiProperty({ type: () => Date })
  @Column()
  expires: Date;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
