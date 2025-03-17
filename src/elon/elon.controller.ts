import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('elon')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createElonDto: CreateElonDto) {
    return this.elonService.create(createElonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Elonlarni olish (sahifalash, saralash va filtr bilan)' })
  @ApiQuery({ name: 'page', required: false, description: 'Sahifa raqami (pagination)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Har bir sahifadagi elonlar soni' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Qaysi maydon boyicha saralash' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Saralash tartibi (asc yoki desc)' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Kategoriya boyicha filtr' })
  @ApiQuery({ name: 'userId', required: false, description: 'Foydalanuvchi boyicha filtr' })
  @ApiQuery({ name: 'type', required: false, description: 'Mahsulot turi (Yangi yoki Ishlatilgan)' })
  @ApiQuery({ name: 'color', required: false, description: 'Rang boyicha filtr' })
  @ApiQuery({ name: 'minPrice', required: false, description: 'Minimal narx boyicha filtr' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maksimal narx boyicha filtr' })
  @ApiQuery({ name: 'title', required: false, description: 'Elon nomi boyicha qidirish' })
  findAll(@Query() query) {
    return this.elonService.findAll(query);
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElonDto: UpdateElonDto) {
    return this.elonService.update(id, updateElonDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elonService.remove(id);
  }
}
