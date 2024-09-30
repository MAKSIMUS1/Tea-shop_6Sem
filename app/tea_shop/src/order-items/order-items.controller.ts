import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { OrderItem } from './order-items.model';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { EditOrderItemDto } from './dto/edit-order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<OrderItem> {
    return this.orderItemsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.orderItemsService.remove(+id);
  }

  @Get('order/:orderId')
  findByOrderId(@Param('orderId') orderId: number) {
    return this.orderItemsService.findByOrderId(orderId);
  }
  @Put(':id')
  async editQuantity(@Param('id') id: number, @Body() editOrderItemDto: EditOrderItemDto) {
    return this.orderItemsService.editQuantity(id, editOrderItemDto);
  }
}
