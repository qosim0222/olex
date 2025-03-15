import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Region, RegionSchema } from 'src/region/entities/region.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Region.name, schema: RegionSchema
      
     },

  ]),
JwtModule.register({global:true,
  secret:process.env.JWT_KEY || 'key',
  signOptions:{expiresIn: '1h'}
})
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
