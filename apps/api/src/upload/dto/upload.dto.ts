import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UploadDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  articleId: number;

  @ApiProperty()
  @IsDate()
  createAt: Date;

  @ApiProperty()
  @IsDate()
  updateAt: Date;
}
