import { Module } from '@nestjs/common';
import { CategotryService } from './categotry.service';
import { CategotryController } from './categotry.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/categotry.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategotryController],
  providers: [CategotryService],
})
export class CategotryModule {}
