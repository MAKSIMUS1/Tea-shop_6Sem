import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'Идентификатор пользователя' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'confirmed', description: 'Статус заказа' })
  status: string;

  @ApiProperty({ example: '2024-04-24T10:00:00', description: 'Дата размещения заказа' })
  @IsNotEmpty()
  //@IsDateString()
  order_date: Date;
}
