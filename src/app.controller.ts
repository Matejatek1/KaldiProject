import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getAllMessagesFromConversation')
  getAllMessagesFromConversation(
    @Body('conversationId') conversationId: number,
    @Request() req
  ): Promise<Array<MessageDto>> {
    return this.messageService.getAllMessagesFromConversation(
      conversationId,
      req.user.id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('addMessage')
  addMessage(
    @Body('message') message: string,
    @Body('conversationId') conversationId: number,
    @Request() req
  ): Promise<MessageDto> {
    return this.messageService.addMessage(message, conversationId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllConversations')
  getAllConversations(@Request() req): Promise<Array<Conversation>> {
    return this.conversationService.getAllConversations(req.user.operator);
  }

  @UseGuards(JwtAuthGuard)
  @Post('takeConversation')
  takeConversation(
    @Body('conversationId') conversationId: number,
    @Request() req
  ): Promise<[TakeConversationDto, MessageDto[]]> {
    return this.conversationService.takeConversation(
      conversationId,
      req.user.id
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('createNewConversation')
  createNewConversation(
    @Body('roomId') roomId: number,
    @Request() req
  ): Promise<Conversation> {
    try {
      return this.conversationService.createNewConversation(
        roomId,
        req.user.id,
        req.user.name,
        req.user.operator
      );
    } catch (e) {
      return e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('continueConversation')
  continueConversation(@Request() req): Promise<Array<Conversation>> {
    return this.conversationService.continueConversation(
      req.user.id,
      req.user.operator
    );
  }

  @Get('getRooms')
  getRooms(): Promise<Array<Room>> {
    return this.roomsService.getRooms();
  }
}
