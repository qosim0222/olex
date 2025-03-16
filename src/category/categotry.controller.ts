import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategotryService } from './categotry.service';
import { CreateCategotryDto } from './dto/create-categotry.dto';
import { UpdateCategotryDto } from './dto/update-categotry.dto';

@Controller('categotry')
export class CategotryController {
  constructor(private readonly categotryService: CategotryService) {}

  @Post()
  create(@Body() createCategotryDto: CreateCategotryDto) {
    return this.categotryService.create(createCategotryDto);
  }

  @Get()
  findAll() {
    return this.categotryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categotryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategotryDto: UpdateCategotryDto) {
    return this.categotryService.update(id, updateCategotryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categotryService.remove(id);
  }
}
