import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '~/shared/user.entity';
import { UsersController } from './users.controller';
import { AuthModule } from '~/modules/auth/auth.module';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
})
export class UsersModule {}
