import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from "multer"
import  *as path from 'path';

@Controller('upload')
export class UploadController {
  
  @Post()
  @ApiOperation({ summary: 'Upload file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, cb) {
          let name = `${Date.now()}-${Math.random() * 99999}${path.extname(file.originalname)}`
          cb(null, name)
        }
      })
    }
    )
  )

  uploadFile(@UploadedFile() file) {
    return { name: file.filename }
  }

}


