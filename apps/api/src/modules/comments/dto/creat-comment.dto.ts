import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Основное содержание комментария',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;
}
