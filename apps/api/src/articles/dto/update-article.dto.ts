import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Полe title обязательно для заполнения.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe text обязательно для заполнения.' })
  text: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe description обязательно для заполнения.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Полe tags обязательно для заполнения.' })
  tags: string;
}
