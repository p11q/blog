import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Заголовок статьи',
    example: 'Случай из моей жизни ...',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe title обязательно для заполнения.' })
  title: string;

  @ApiProperty({
    description: 'Основное содержание Вашей статьи',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;

  @ApiProperty({
    description: 'Краткое описание Вашей статьи',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe description обязательно для заполнения.' })
  description: string;

  @ApiProperty({
    description: 'Тэги по которым будут находить Вашу статью',
    example: '#life#style',
  })
  @IsString()
  @IsNotEmpty({ message: 'Полe tags обязательно для заполнения.' })
  tags: string;
}
