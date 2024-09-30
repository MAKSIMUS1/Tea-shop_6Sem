import { Column, Model, Table, PrimaryKey, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { User } from 'src/users/users.model';
import { OrderItem } from 'src/order-items/order-items.model';
import { OrderConfirmation } from 'src/order-confirmations/order-confirmations.model';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор заказа' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  orderId: number;

  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ApiProperty({ example: '2024-04-24 10:00:00', description: 'Дата размещения заказа' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date: Date;

  @ApiProperty({ example: 'created', description: 'Статус заказа' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @HasMany(() => OrderConfirmation)
  orderConfirmations: OrderConfirmation[];
}
