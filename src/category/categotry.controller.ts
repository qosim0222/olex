import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategotryService } from './categotry.service';
import { CreateCategotryDto } from './dto/create-categotry.dto';
import { UpdateCategotryDto } from './dto/update-categotry.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('categotry')
export class CategotryController {
  constructor(private readonly categotryService: CategotryService) { }
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategotryDto: CreateCategotryDto) {
    return this.categotryService.create(createCategotryDto);
  }
  @ApiQuery({ name: 'page', required: false, description: 'Sahifa raqami (standart 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Har sahifada nechta (standart 10)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Saralash maydoni (standart createdAt)' })
  @ApiQuery({ name: 'sortOrder', required: false, description: "'asc' yoki 'desc' (standart desc)" })
  @ApiQuery({ name: 'name', required: false, description: 'Kategoriya nomi boyicha qidirish' })
  @Get()
  findAll(@Query() query: any) {
    return this.categotryService.findAll(query);
  }


  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categotryService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategotryDto: UpdateCategotryDto) {
    return this.categotryService.update(id, updateCategotryDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categotryService.remove(id);
  }
}
