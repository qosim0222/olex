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
  
   async findAll() {
      try {
        let all = await this.cateCategoryModel.find().exec()
        return all
      } catch (error) {
        return {message: error.message}
  
      }
       
    }
  
    async findOne(id: string) {
      try {
        let data = await this.cateCategoryModel.findById(id);
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
