
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Elon } from 'src/elon/schema/elon.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;

    
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Elon' }] }) 
    elon: Elon[];

}

export const CategorySchema = SchemaFactory.createForClass(Category);
