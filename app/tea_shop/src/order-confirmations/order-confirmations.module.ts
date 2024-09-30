import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderConfirmation } from './order-confirmations.model';
import { OrderConfirmationsController } from './order-confirmations.controller';
import { OrderConfirmationsService } from './order-confirmations.service';
import { OrdersService } from 'src/orders/orders.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from './mail.service';
import { Order } from 'src/orders/orders.model';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';

@Module({
  imports: [SequelizeModule.forFeature([OrderConfirmation, Order, User, Role])], 
  controllers: [OrderConfirmationsController],
  providers: [OrderConfirmationsService, OrdersService, UsersService, MailService, RolesService],
  exports: [OrderConfirmationsService]
})
export class OrderConfirmationsModule {}
