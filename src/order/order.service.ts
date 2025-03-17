import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      let created = await this.orderModel.create(createOrderDto);
      return created;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll(query: any) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const sortBy = query.sortBy || 'createdAt';
      const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

      const filter: any = {};
      if (query.userId) filter.userId = query.userId; 
      if (query.elonId) filter.elonId = query.elonId; 
      const orders = await this.orderModel
        .find(filter)
        .populate('userId')
        .populate('elonId')
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      return { orders, page, limit };
    } catch (error) {
      return { message: error.message };
    }
  }


  async findOne(id: string) {
    try {
      let data = await this.orderModel.findById(id).populate('userId').populate('elonId').exec();
      return data;
    } catch (error) {
      return { message: error.message };
    }
  }

}
