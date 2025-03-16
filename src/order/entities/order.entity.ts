import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Elon } from 'src/elon/schema/elon.schema';
import { User } from 'src/user/schema/user.schema';
export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true }) 
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Elon', required: true })
  elonId: Elon;

  @Prop({ default: 'pending' }) 
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
