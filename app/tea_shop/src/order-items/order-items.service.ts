import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderItem } from './order-items.model';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { EditOrderItemDto } from './dto/edit-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectModel(OrderItem)
    private readonly orderItemModel: typeof OrderItem,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemModel.create(createOrderItemDto);
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemModel.findAll();
  }

  async findOne(id: number): Promise<OrderItem> {
    return this.orderItemModel.findByPk(id);
  }

  async remove(id: number): Promise<void> {
    const orderItem = await this.findOne(id);
    await orderItem.destroy();
  }
  async findByOrderId(orderId: number): Promise<OrderItem[]> {
    return this.orderItemModel.findAll({
      where: {
        orderId: orderId,
      },
    });
  }
  async editQuantity(id: number, editOrderItemDto: EditOrderItemDto) {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(`id: ${id}`);
    console.log(`editOrderItemDto.orderId: ${editOrderItemDto.orderId}`);
    console.log(`editOrderItemDto.productId: ${editOrderItemDto.productId}`);
    console.log(`editOrderItemDto.quantity: ${editOrderItemDto.quantity}`);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    const orderItem = await this.orderItemModel.findByPk(id);
    if (!orderItem) {
      throw new Error('Order item not found');
    }
    return orderItem.update(editOrderItemDto);
  }
}
