import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ElonModule } from './elon/elon.module';
import { CategotryModule } from './category/categotry.module';
import { RegionModule } from './region/region.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot:'/uploads'
    }),

    ConfigModule.forRoot(),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017/olex"),
    UserModule,
    ElonModule,
    CategotryModule,
    RegionModule,
    OrderModule,
    UploadModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
