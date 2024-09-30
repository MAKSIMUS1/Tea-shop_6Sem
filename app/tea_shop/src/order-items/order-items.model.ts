import { Column, Model, Table, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { Order } from 'src/orders/orders.model';
import { Product } from 'src/products/products.model';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model<OrderItem> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор элемента заказа' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  order_item_id: number;

  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ApiProperty({ example: 1, description: 'Идентификатор товара' })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ApiProperty({ example: 5, description: 'Количество товара' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  // Отношение "принадлежит" к заказу
  @BelongsTo(() => Order)
  order: Order;

  // Отношение "принадлежит" к товару
  @BelongsTo(() => Product)
  product: Product;
}
