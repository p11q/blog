import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadDto, UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '~/guards/auth.guard';
import { User } from '~/libs/common/decorators/user.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get(':id_article')
  getList(@Param('id_article') id_article: number): Promise<UploadDto[]> {
    return this.uploadService.getList(id_article);
  }

  @Post(':id_article')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @User('id') id_author: number,
    @Param('id_article') id_article: number,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadDto> {
    return this.uploadService.uploadFile(id_author, id_article, file);
  }
}
