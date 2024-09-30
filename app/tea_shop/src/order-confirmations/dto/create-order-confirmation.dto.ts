import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderConfirmationDto {
  @ApiProperty({ example: 1, description: 'Идентификатор заказа' })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ example: 'ABCD1234', description: 'Код подтверждения' })
  @IsString()
  @IsNotEmpty()
  confirmation_code: string;
}
