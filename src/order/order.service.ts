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

  async findAll() {
    try {
      let all = await this.orderModel.find().populate('userId').populate('elonId').exec();
      return all;
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

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      let updated = await this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.orderModel.findByIdAndDelete(id).exec();
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
