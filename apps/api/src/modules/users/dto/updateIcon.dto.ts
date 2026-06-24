import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

export class UploadIconDto {
  @ApiProperty({ nullable: true })
  @ValidateIf((_obj, value) => value !== null && value !== undefined)
  @IsString()
  icon: string | undefined;

  constructor(path: string | undefined) {
    this.icon = path;
  }
}
