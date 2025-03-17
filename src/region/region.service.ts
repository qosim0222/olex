import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Region } from './entities/region.entity';
import { Model } from 'mongoose';

@Injectable()
export class RegionService {

  constructor(@InjectModel(Region.name) private regionModel: Model<Region>) {}


 async create(createRegionDto: CreateRegionDto) {
    
  try {
     let created = await this.regionModel.create(createRegionDto)
     return created
    } catch (error) {
     return {message: error.message}
    }
   }
 
  async findAll() {
     try {
       let all = await this.regionModel.find().populate('user').exec()
       return all
     } catch (error) {
       return {message: error.message}
 
     }
      
   }
 
   async findOne(id: string) {
     try {
       let data = await this.regionModel.findById(id);
       return data
     } catch (error) {
       return {message: error.message}
     }
   }
 
   async update(id: string, updateRegionDto: UpdateRegionDto) {
     try {
       let apdated = await this.regionModel.findByIdAndUpdate(id, updateRegionDto);
       return apdated
     } catch (error) {
       return {message: error.message}
     }
   }
 
   async remove(id: string) {
     try {
       let deleted = await this.regionModel.findByIdAndDelete(id);
       return deleted
     } catch (error) {
       return {message: error.message}
     }
   }
}