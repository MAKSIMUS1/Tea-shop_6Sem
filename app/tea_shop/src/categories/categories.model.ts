import { Column, Model, Table, PrimaryKey, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { Product } from 'src/products/products.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор категории' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  category_id: number;

  @ApiProperty({ example: 'Чай', description: 'Название категории' })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @HasMany(() => Product)
  products: Product[];
}
