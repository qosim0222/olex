import { Module } from '@nestjs/common';
import { ElonService } from './elon.service';
import { ElonController } from './elon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Elon, ElonSchema } from './schema/elon.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Elon.name, schema:ElonSchema}])],
  controllers: [ElonController],
  providers: [ElonService],
})
export class ElonModule {}
