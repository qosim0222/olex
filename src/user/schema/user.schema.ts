import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Region } from 'src/region/entities/region.entity';

export type UserDocument = HydratedDocument<User>;

enum Usertype {
    client = 'CLIENT',
    seller = 'SELLER'
}

@Schema() 
export class User {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    location?: string; 
    
    @Prop()
    shopname?: string; 
    
    @Prop({ required: true })
    image: string;
    
    @Prop({ required: true, enum: Usertype })
    type: Usertype;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region', required: true })
    region: Region;
    
  }

export const UserSchema = SchemaFactory.createForClass(User);
