import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderConfirmation } from './order-confirmations.model';
import { CreateOrderConfirmationDto } from './dto/create-order-confirmation.dto';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { MailService } from './mail.service';

@Injectable()
export class OrderConfirmationsService {
  constructor(
    @InjectModel(OrderConfirmation)
    private orderConfirmationModel: typeof OrderConfirmation,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async create(createOrderConfirmationDto: CreateOrderConfirmationDto): Promise<OrderConfirmation> {
    return this.orderConfirmationModel.create(createOrderConfirmationDto);
  }

  async findAll(): Promise<OrderConfirmation[]> {
    return this.orderConfirmationModel.findAll();
  }

  async sendConfirmationCode(orderId: number) {
    const order = await this.ordersService.findOne(orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }

    if (order.status !== 'created') {
      throw new Error(`Cannot send confirmation code for order with ID ${orderId}: Order status is not "created".`);
    }

    await this.ordersService.updateOrderStatus(orderId, 'awaiting_confirmation');

    const confirmationCode = this.generateConfirmationCode();

    const order_confirmtaion = await this.orderConfirmationModel.create({
      orderId: orderId,
      confirmation_code: confirmationCode,
      confirmed_at: null,
    });

    const user = await this.usersService.getUserById(order.userId);
    if (!user) {
      throw new Error(`User with ID ${order.userId} not found.`);
    }

    await this.mailService.sendConfirmationCode(user.email, confirmationCode);
    return order_confirmtaion;
  }

  async confirmOrder(orderId: number, confirmation: any) {
    const orderConfirmation = await this.orderConfirmationModel.findOne({
      where: {
        orderId,
        confirmation_code: confirmation.confirmationCode,
      },
    });

    if (!orderConfirmation) {
      throw new NotFoundException('Order confirmation not found');
    }

    await this.ordersService.updateOrderStatus(orderId, 'confirmed');

    return orderConfirmation.update({ confirmed_at: new Date() });
  }

  async resendConfirmationCode(orderId: number) {
    const orderConfirmation = await this.orderConfirmationModel.findOne({
      where: {
        orderId,
      },
    });

    if (!orderConfirmation) {
      throw new NotFoundException('Order confirmation not found');
    }

    const newConfirmationCode = this.generateConfirmationCode();

    const order_confirmtaion = await orderConfirmation.update({ confirmation_code: newConfirmationCode });

    const order = await this.ordersService.findOne(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found.`);
    }
    
    const user = await this.usersService.getUserById(order.userId);
    if (!user) {
      throw new Error(`User with ID ${order.userId} not found.`);
    }

    await this.mailService.sendConfirmationCode(user.email, newConfirmationCode);
    return order_confirmtaion;
  }

  private generateConfirmationCode(): string {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  }
}

