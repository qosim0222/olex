import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiQuery({ name: 'userId', required: false, description: 'User ID bo‘yicha filter' })
  @ApiQuery({ name: 'elonId', required: false, description: 'Elon ID bo‘yicha filter' })
  @ApiQuery({ name: 'page', required: false, description: 'Sahifalash uchun sahifa raqami' })
  @ApiQuery({ name: 'limit', required: false, description: 'Bir sahifada nechta natija bo‘lishi' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Qaysi ustun bo‘yicha tartiblash' })
  @ApiQuery({ name: 'sortOrder', required: false, description: 'Tartiblash tartibi (asc yoki desc)' })
  findAll(@Query() query: any) {
    return this.orderService.findAll(query);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
