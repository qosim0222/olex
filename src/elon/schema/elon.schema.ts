import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/schema/user.schema';
import { Category } from 'src/category/entities/categotry.entity';

export type ElonDocument = HydratedDocument<Elon>;

enum ProductType {
  NEW = 'New',
  OLD = 'Old',
}

@Schema()
export class Elon {
  
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  price: number;
  
  @Prop({ required: true })
  desc: string;
  
  @Prop({ required: true })
  image: string;
  
  @Prop({ required: true })
  comment: string;
  
  @Prop({ required: true })
  color: string;
  
  @Prop({ required: true, enum: ProductType })
  type: ProductType;

@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
userId: User; 

@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true })
categoryId: Category;  

}
export const ElonSchema = SchemaFactory.createForClass(Elon);
