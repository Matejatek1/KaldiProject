import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { BasicAuthGuard } from './auth/basic-auth.guard';
import { MessagesService } from './messages/messages.service';
import { Conversation } from './conversations/conversation.entity';
import { ConversationsService } from './conversations/conversations.service';
import { Room } from './rooms/room.entity';
import { RoomsService } from './rooms/rooms.service';
import { MessageDto } from './dtos/message.dto';
import { TakeConversationDto } from './dtos/take-conversation.dto';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessagesService,
    private readonly conversationService: ConversationsService,
    private readonly roomsService: RoomsService
  ) {}

  @UseGuards(BasicAuthGuard)
  @Get('conversations/:id/messages')
  getMessages(
    @Param('id') id: number,
    @Request() req
  ): Promise<Array<MessageDto>> {
    return this.conversationService.getAllMessagesFromConversation(
      id,
      req.user.id
    );
  }

  @UseGuards(BasicAuthGuard)
  @Post('conversations/:id/messages')
  addMessage(
    @Param('id') id: number,
    @Body('message') message: string,
    @Request() req
  ): Promise<MessageDto> {
    return this.messageService.addMessage(message, id, req.user.id);
  }

  @UseGuards(BasicAuthGuard)
  @Get('getAllConversations')
  getAllConversations(@Request() req): Promise<Array<Conversation>> {
    return this.conversationService.getAllConversations(req.user.isOperator);
  }

  @UseGuards(BasicAuthGuard)
  @Get('conversations/:id/take')
  takeConversation(
    @Param('id') id: number,
    @Request() req
  ): Promise<[TakeConversationDto, MessageDto[]]> {
    return this.conversationService.takeConversation(id, req.user.id);
  }

  @UseGuards(BasicAuthGuard)
  @Post('conversations')
  createConversation(
    @Body('roomId') roomId: number,
    @Request() req
  ): Promise<Conversation> {
    try {
      return this.conversationService.createNewConversation(
        roomId,
        req.user.id
      );
    } catch (e) {
      return e;
    }
  }

  @UseGuards(BasicAuthGuard)
  @Get('/conversations/continue')
  continueConversation(@Request() req): Promise<Array<Conversation>> {
    return this.conversationService.continueConversation(
      req.user
    );
  }

  @Get('rooms')
  getRooms(): Promise<Array<Room>> {
    return this.roomsService.getRooms();
  }
}
