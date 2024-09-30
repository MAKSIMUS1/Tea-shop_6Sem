import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrderConfirmationsService } from './order-confirmations.service';
import { CreateOrderConfirmationDto } from './dto/create-order-confirmation.dto';

@Controller('order-confirmations')
export class OrderConfirmationsController {
  constructor(private readonly orderConfirmationsService: OrderConfirmationsService) {}
  
  @Post(':orderId/send-confirmation-code')
  async sendConfirmationCode(@Param('orderId') orderId: number) {
    return this.orderConfirmationsService.sendConfirmationCode(orderId);
  }

  @Post(':orderId/confirm')
  async confirmOrder(@Param('orderId') orderId: number, @Body() confirmation: string) {
    return this.orderConfirmationsService.confirmOrder(orderId, confirmation);
  }

  @Post(':orderId/resend-confirmation-code')
  async resendConfirmationCode(@Param('orderId') orderId: number) {
    return this.orderConfirmationsService.resendConfirmationCode(orderId);
  }
  
}
