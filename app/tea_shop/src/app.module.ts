import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ProductsModule } from './products/products.module';
import * as path from 'path'
import { Product } from "./products/products.model";
import { CategoriesModule } from './categories/categories.module';
import { Category } from "./categories/categories.model";
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { OrderConfirmationsModule } from './order-confirmations/order-confirmations.module';
import { OrderConfirmation } from "./order-confirmations/order-confirmations.model";
import { OrderItem } from "./order-items/order-items.model";
import { Order } from "./orders/orders.model";
import { ChatModule } from './chat/chat.module';
import { Chat } from "./chat/chat.model";
import { MessageModule } from './message/message.module';
import { Message } from "./message/message.model";
import { SocketGateway } from "./socket/socket.service";

@Module({
    controllers: [],
    providers: [SocketGateway],
    imports: [
      ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      ServeStaticModule.forRoot({
        rootPath: path.resolve( __dirname, '..', 'static'),
      }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host:        process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username:    process.env.POSTGRES_USER,
          password:    String(process.env.POSTGRES_PASSWORD),
          database:    process.env.POSTGRES_DB,
          models: [User, Role, UserRoles, Post, Category, Product, Order, OrderItem, OrderConfirmation, Chat, Message],
          autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        ProductsModule,
        CategoriesModule,
        OrdersModule,
        OrderItemsModule,
        OrderConfirmationsModule,
        ChatModule,
        MessageModule
      ],
})
export class AppModule {}