import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() messageData: { text: string, userId: number, chatId: number }): Promise<Message> {
    return await this.messageService.createMessage(messageData.text, messageData.userId, messageData.chatId);
  }

  @Get()
  async findAllMessages(): Promise<Message[]> {
    return await this.messageService.findAllMessages();
  }

  @Get(':id')
  async findMessageById(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findMessageById(+id);
  }
}
