import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategotryService } from './categotry.service';
import { CreateCategotryDto } from './dto/create-categotry.dto';
import { UpdateCategotryDto } from './dto/update-categotry.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('categotry')
export class CategotryController {
  constructor(private readonly categotryService: CategotryService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCategotryDto: CreateCategotryDto) {
    return this.categotryService.create(createCategotryDto);
  }

  @Get()
  findAll() {
    return this.categotryService.findAll();
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
