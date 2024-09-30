import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  readonly orderId: number;

  @ApiProperty({ example: 1, description: 'Идентификатор товара' })
  readonly productId: number;

  @ApiProperty({ example: 3, description: 'Количество товара' })
  readonly quantity: number;
}
