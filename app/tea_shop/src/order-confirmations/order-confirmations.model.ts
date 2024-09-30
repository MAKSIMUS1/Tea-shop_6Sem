import { Column, Model, Table, PrimaryKey, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from "@nestjs/swagger";
import { Order } from 'src/orders/orders.model';

@Table({ tableName: 'order_confirmations' })
export class OrderConfirmation extends Model<OrderConfirmation> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор подтверждения заказа' })
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  confirmation_id: number;

  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  orderId: number;

  @ApiProperty({ example: '123456', description: 'Код подтверждения' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  confirmation_code: string;

  @ApiProperty({ example: '2024-04-24 10:05:00', description: 'Дата и время подтверждения заказа' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  confirmed_at: Date;

  @BelongsTo(() => Order)
  order: Order;
}
