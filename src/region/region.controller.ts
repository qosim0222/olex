import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}
@ApiBearerAuth()
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiQuery({ name: 'name', required: false, description:" Region nomi bo'yicha qidirish" })
  @ApiQuery({ name: 'page', required: false, description: 'Sahifalash uchun sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, description: 'Bir sahifada nechta natija bo‘lishi' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Qaysi ustun bo‘yicha tartiblash' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Tartiblash tartibi (asc yoki desc)' })
  findAll(@Query() query: any) {
    return this.regionService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(id, updateRegionDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
