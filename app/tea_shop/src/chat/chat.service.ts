import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat) private chatModel: typeof Chat) {}

  async createChat(): Promise<Chat> {
    return await this.chatModel.create();
  }

  async findAllChats(): Promise<Chat[]> {
    return await this.chatModel.findAll();
  }

  async findChatById(id: number): Promise<Chat> {
    return await this.chatModel.findByPk(id);
  }
  
  async findChatByUserId(userId: number): Promise<Chat> {
    return this.chatModel.findOne({
        where: {
            users: {
                some: {
                    id: userId,
                },
            },
        },
    });
}
}
