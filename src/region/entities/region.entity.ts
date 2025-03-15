import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type RegionDocument = HydratedDocument<Region>;

@Schema()
export class Region {
  @Prop({ required: true, unique: true })
  name: string;
 
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  user: User[];
}
export const RegionSchema = SchemaFactory.createForClass(Region);
