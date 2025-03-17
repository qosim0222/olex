import { Injectable } from '@nestjs/common';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Elon } from './schema/elon.schema';
import { Model } from 'mongoose';
import { Category } from 'src/category/entities/categotry.entity';

@Injectable()
export class ElonService {

  constructor(
    @InjectModel(Elon.name) private elonModel: Model<Elon>,
    @InjectModel(Category.name) private categoryModel: Model<Category>
  ) { }

  async create(createElonDto: CreateElonDto) {
    try {
      let created = await this.elonModel.create(createElonDto)

      await this.categoryModel.findByIdAndUpdate(created.categoryId, {
        $push: { elon: { $each: [created._id] } }
      })
      return created
    } catch (error) {
      return { message: error.message }
    }
  }

  // async findAll(query: any) {
  //   try {
  //     const page = parseInt(query.page) || 1;
  //     const limit = parseInt(query.limit) || 10;
  //     const sortBy = query.sortBy || 'createdAt';
  //     const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
      
  //     const filter: any = {};
  //     if (query.categoryId) filter.categoryId = query.categoryId; 
  //     if (query.title) filter.title = new RegExp(query.title, 'i'); 

  //     const all = await this.elonModel
  //       .find(filter)
  //       .sort({ [sortBy]: sortOrder })
  //       .skip((page - 1) * limit)
  //       .limit(limit)
  //       .exec();

  //     return { data: all, page, limit };
  //   } catch (error) {
  //     return { message: error.message };
  //   }
  // }

  async findAll(query: any) {
    try {
      const page = parseInt(query.page) || 1;
      const limit = parseInt(query.limit) || 10;
      const sortBy = query.sortBy || 'createdAt';
      const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
  
      const filter: any = {};
      if (query.categoryId) filter.categoryId = query.categoryId; // Kategoriya bo‘yicha filter
      if (query.userId) filter.userId = query.userId; // User ID bo‘yicha filter
      if (query.type) filter.type = query.type; // Mahsulot turi (NEW, OLD) bo‘yicha filter
      if (query.color) filter.color = query.color; // Rangi bo‘yicha filter
      if (query.minPrice) filter.price = { $gte: parseFloat(query.minPrice) }; // Minimal narx filtri
      if (query.maxPrice) {
        filter.price = { ...filter.price, $lte: parseFloat(query.maxPrice) }; // Maksimal narx filtri
      }
      if (query.title) filter.name = new RegExp(query.title, 'i'); // Mahsulot nomi bo‘yicha qidirish (case insensitive)
  
      const all = await this.elonModel
        .find(filter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
  
      const total = await this.elonModel.countDocuments(filter); 
  
      return { data: all, page, limit, total };
    } catch (error) {
      return { message: error.message };
    }
  }
  


  async findOne(id: string) {
    try {
      let data = await this.elonModel.findById(id);
      return data
    } catch (error) {
      return { message: error.message }
    }
  }

  async update(id: string, updateElonDto: UpdateElonDto) {
    try {
      let apdated = await this.elonModel.findByIdAndUpdate(id, updateElonDto);
      return apdated
    } catch (error) {
      return { message: error.message }
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.elonModel.findByIdAndDelete(id);

      await this.categoryModel.findByIdAndUpdate(deleted?.categoryId, {
        $pull: { elon: deleted?._id }
      })

      return deleted
    } catch (error) {
      return { message: error.message }
    }
  }
}
