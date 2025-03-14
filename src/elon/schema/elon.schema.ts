
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ElonDocument = HydratedDocument<Elon>;

@Schema()
export class Elon {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const ElonSchema = SchemaFactory.createForClass(Elon);
