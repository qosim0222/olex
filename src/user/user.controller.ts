import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, loginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { query } from 'express';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: loginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Get()

  @ApiQuery({ name: 'fullname', required: false, description: 'Foydalanuvchini fullname boyicha qidirish' })
  @ApiQuery({ name: 'region', required: false, description: 'Foydalanuvchini region boyicha qidirish' })
  @ApiQuery({ name: 'page', required: false, description: 'Sahifalash uchun sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, description: 'Bir sahifada nechta natija bolishi' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Qaysi ustun boyicha tartiblash' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Tartiblash tartibi (asc yoki desc)' })

  findAll(@Query() query:any) {
    return this.userService.findAll(query);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
@UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
