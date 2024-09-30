import { Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(): Promise<Chat> {
    return await this.chatService.createChat();
  }

  @Get()
  async findAllChats(): Promise<Chat[]> {
    return await this.chatService.findAllChats();
  }

  @Get(':id')
  async findChatById(@Param('id') id: string): Promise<Chat> {
    return await this.chatService.findChatById(+id);
  }
}
