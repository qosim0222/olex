import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const ElonSchema = SchemaFactory.createForClass(Elon);
