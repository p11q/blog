import { UserEntity } from '~/shared/module/user.entity';

export interface AuthenticatedRequest {
  headers: { authorization?: string };
  user: JwtPayload;
}

export type JwtPayload = Pick<UserEntity, 'email' | 'id' | 'name' | 'role'>;
