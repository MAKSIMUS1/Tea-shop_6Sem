import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async createMessage(text: string, userId: number, chatId: number): Promise<Message> {
    return this.messageModel.create({
        text,
        userId,
        chatId,
    });
}

  async findAllMessages(): Promise<Message[]> {
    return await this.messageModel.findAll();
  }

  async findMessageById(id: number): Promise<Message> {
    return await this.messageModel.findByPk(id);
  }

  async findMessagesByChatId(chatId: string): Promise<Message[]> {
    return this.messageModel.findAll({
        where: { chatId },
        order: [['createdAt', 'DESC']],
    });
  }
  async deleteMessagesByChatId(chatId: string): Promise<void> {
    await this.messageModel.destroy({
        where: { chatId },
    });
  }
}
