import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { User } from '../users/users.model';
import { Message } from '../message/message.model';

@Module({
  imports: [SequelizeModule.forFeature([Chat, User, Message])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
