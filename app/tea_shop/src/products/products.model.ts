import { Column, Model, Table, PrimaryKey, DataType, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { Category } from 'src/categories/categories.model';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор товара' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  product_id: number;

  @ApiProperty({ example: 'Чай "Ассам"', description: 'Название товара' })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'Очень вкусный чай', description: 'Описание товара' })
  @Column({
    type: DataType.STRING(1023),
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: 10.99, description: 'Цена товара' })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Ссылка на изображение товара' })
  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  image_url: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @ApiProperty({ example: 1, description: 'Идентификатор категории товара' })
  category: Category;
}
