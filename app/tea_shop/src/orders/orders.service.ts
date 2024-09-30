import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    createOrderDto.order_date = new Date();
    return this.orderModel.create(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.findAll();
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderModel.findAll({
      where: {
        userId: userId,
      },
    });
  }
  
  async findOne(id: number): Promise<Order> {
    return this.orderModel.findByPk(id);
  }
  
  async updateOrderStatus(orderId: number, newStatus: string) {
    const order = await this.orderModel.findByPk(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }
    await order.update({ status: newStatus });
    return order;
  }
}
