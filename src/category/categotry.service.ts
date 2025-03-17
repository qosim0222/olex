import { Injectable } from '@nestjs/common';
import { CreateCategotryDto } from './dto/create-categotry.dto';
import { UpdateCategotryDto } from './dto/update-categotry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/categotry.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategotryService {

  constructor(@InjectModel(Category.name) private cateCategoryModel: Model<Category>) {}

 async create(createCategotryDto: CreateCategotryDto) {
  try {
      let created = await this.cateCategoryModel.create(createCategotryDto)
      return created
     } catch (error) {
      return {message: error.message}
     }
    }
  
    async findAll(query: any) {
      try {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const sortBy = query.sortBy || 'createdAt';
        const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
  
        const filter: any = {};
        if (query.name) filter.name = new RegExp(query.name, 'i');
  
        const data = await this.cateCategoryModel
          .find(filter)
          .sort({ [sortBy]: sortOrder })
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('elon')
          .exec();
  
        const total = await this.cateCategoryModel.countDocuments(filter);
  
        return { data, page, limit, total };
      } catch (error) {
        return { message: error.message };
      }
    }
  
  
    async findOne(id: string) {
      try {
        let data = await this.cateCategoryModel.findById(id).populate('elon').exec();
        return data
      } catch (error) {
        return {message: error.message}
      }
    }
  
    async update(id: string,updateCategotryDto: UpdateCategotryDto) {
      try {
        let apdated = await this.cateCategoryModel.findByIdAndUpdate(id, updateCategotryDto);
        return apdated
      } catch (error) {
        return {message: error.message}
      }
    }
  
    async remove(id: string) {
      try {
        let deleted = await this.cateCategoryModel.findByIdAndDelete(id);
        return deleted
      } catch (error) {
        return {message: error.message}
      }
    }
}
