import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Обновленное основное содержание комментария',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;
}
