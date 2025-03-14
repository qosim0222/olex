import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ElonModule } from './elon/elon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/olex"),
    UserModule,
    ElonModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
