import { Body, Controller, Get, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus, Param, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {constructor(
    private productService: ProductsService,
    private filesService: FilesService,
) {}
    
  
    @Get('search-products')
    searchProducts(@Query('keyword') keyword: string) {
          return this.productService.searchProducts(keyword);
    }

    @Post('filter')
    filterProducts(@Body() filters: any) {
        return this.productService.filterProducts(filters);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async create(@UploadedFile() image: Express.Multer.File, @Body() dto: CreateProductDto) {
      try {
        const imageUrl = await this.filesService.createFile(image);
        const product = await this.productService.createProduct(dto, imageUrl);
        return product;
      } catch (error) {
        throw new HttpException('Ошибка при создании продукта', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }
    @Get(':id')
    async getOneProduct(@Param('id') id: number) {
        return this.productService.getOneProduct(id);
    }
    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    updatePost(@Param('id') id: number, @Body() dto: UpdateProductDto, @UploadedFile() image) {
        return this.productService.updateProduct(id, dto, image);
    }
}
