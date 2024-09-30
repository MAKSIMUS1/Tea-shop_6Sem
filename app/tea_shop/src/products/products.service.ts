import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesService } from 'src/files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        private fileService: FilesService
    ) {}

    async createProduct(createProductDto: CreateProductDto, image_url: string): Promise<Product> {
        return this.productModel.create({ ...createProductDto, image_url });
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.findAll();
    }
    async getOneProduct(id: number): Promise<Product> {
        const product = await this.productModel.findByPk(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    
    async searchProducts(keyword: string): Promise<Product[]> {
        const products = await this.productModel.findAll({
            where: {
                name: { [Op.like]: `%${keyword}%` },
            },
        });
        return products;
    }

    async filterProducts(filters: any): Promise<Product[]> {
        const { categoryType } = filters;

        const products = await this.productModel.findAll({
            where: {
                category_id: categoryType,
            },
        });
        return products;
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto, image: any): Promise<Product> {
        const product = await this.productModel.findByPk(id);

        if (!product) {
            throw new NotFoundException(`product with id ${id} not found`);
        }

        let updatedImageName = product.image_url;
        if (image) {
            updatedImageName = await this.fileService.createFile(image);
        }

        await product.update({...updateProductDto, image_url: updatedImageName});

        return product;
    }
}
