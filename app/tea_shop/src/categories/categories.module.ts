import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './categories.model';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Product } from '../products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])], 
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
