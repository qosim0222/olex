import { Injectable } from '@nestjs/common';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Elon } from './schema/elon.schema';
import { Model } from 'mongoose';

@Injectable()
export class ElonService {

  constructor(@InjectModel(Elon.name) private  elonModel:Model<Elon>){}
  async create(createElonDto: CreateElonDto) {
   try {
    let created = await this.elonModel.create(createElonDto)
    return created
   } catch (error) {
    return {message: error.message}
   }
  }

 async findAll() {
    try {
      let all = await this.elonModel.find().exec()
      return all
    } catch (error) {
      return {message: error.message}

    }
     
  }

  async findOne(id: string) {
    try {
      let data = await this.elonModel.findById(id);
      return data
    } catch (error) {
      return {message: error.message}
    }
  }

  async update(id: string, updateElonDto: UpdateElonDto) {
    try {
      let apdated = await this.elonModel.findByIdAndUpdate(id, updateElonDto);
      return apdated
    } catch (error) {
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
      let deleted = await this.elonModel.findByIdAndDelete(id);
      return deleted
    } catch (error) {
      return {message: error.message}
    }
  }
}
