import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Название товара', description: 'Название товара' })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ example: 'Описание товара', description: 'Описание товара' })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ example: 100, description: 'Цена товара' })
    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Ссылка на изображение товара' })
    @IsNotEmpty()
    @IsString()
    //@IsUrl()
    readonly imageUrl: string;

    @ApiProperty({ example: 1, description: 'Идентификатор категории товара' })
    @IsNotEmpty()
    @IsNumber()
    readonly categoryId: number;
}
