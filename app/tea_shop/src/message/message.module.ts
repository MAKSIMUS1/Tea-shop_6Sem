import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './message.model';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { User } from '../users/users.model';
import { Chat } from '../chat/chat.model';

@Module({
  imports: [SequelizeModule.forFeature([Message, User, Chat])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
