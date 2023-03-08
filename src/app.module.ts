import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { WeaponsModule} from './weapons/weapons.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProductsModule, WeaponsModule, MongooseModule.forRoot(
    'mongodb+srv://rksi05:20051110@cluster0.xuhptl2.mongodb.net/test'
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
