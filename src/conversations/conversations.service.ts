import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { MessagesService } from 'src/messages/messages.service';
import { MessageDto } from 'src/dtos/message.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { TakeConversationDto } from 'src/dtos/take-conversation.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesService: MessagesService,
    private readonly roomRepository: RoomsService,
    private readonly usersService: UsersService,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async getConversationById(conversationId: number): Promise<Conversation> {
    return this.conversationsRepository.findOne({
      where: { id: conversationId },
      relations: ['messages', 'user', 'worker', 'room'],
    });
  }

  // For worker
  async getAllConversations(isOperator: boolean): Promise<Array<Conversation>> {
    if (isOperator) {
      return this.conversationsRepository.find();
    }
    throw new UnauthorizedException('You are not an operator.');
  }

  async takeConversation(
    conversationId: number,
    userId: number
  ): Promise<[TakeConversationDto, MessageDto[]]> {
    const conversation: Conversation =
      await this.getConversationById(conversationId);
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`
      );
    }
    if (conversation.worker) {
      throw new BadRequestException(
        `The conversation already has an assigned worker.`
      );
    }
    const worker: User = await this.usersService.getUserFromId(userId);
    conversation.worker = worker;
    conversation.status = 1;
    const savedConversation: Conversation =
      await this.conversationsRepository.save(conversation);
    const messages = await this.getAllMessagesFromConversation(
      savedConversation.id,
      userId
    );
    return [
      this.classMapper.map(
        savedConversation,
        Conversation,
        TakeConversationDto
      ),
      messages,
    ];
  }

  // For user
  async createNewConversation(
    roomId: number,
    userId: number
  ): Promise<Conversation> {
    const room = await this.roomRepository.getRoomById(roomId);
    if (room == null) {
      throw new NotFoundException(`Room was not found.`);
    }
    const user = await this.usersService.getUserFromId(userId);
    if (user.isOperator) {
      throw new UnauthorizedException(
        `You are an operator and can not start new conversations.`
      );
    }

    const newConversation = await this.conversationsRepository.create({
      user: user,
      userName: user.username,
      room: await this.roomRepository.getRoomById(roomId),
      status: 0,
    });
    return await this.conversationsRepository.save(newConversation);
  }

  async getAllMessagesFromConversation(
    conversationId: number,
    userId: number
  ): Promise<MessageDto[]> {
    const conversation: Conversation =
      await this.getConversationById(conversationId);
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`
      );
    }
    if (
      !(conversation.user?.id == userId) &&
      !(conversation.worker?.id == userId)
    ) {
      throw new UnauthorizedException(
        `You are not allowed to view conversation with ID ${conversationId}`
      );
    }
    const messages = await conversation.messages;
    return messages;
  }

  async continueConversation(
    user: User
  ): Promise<Array<Conversation>> {
    const conversation: Array<Conversation> =
      await this.usersService.getConversations(user.id);
    if (conversation == null) {
      throw new NotFoundException(`Conversations were not found.`);
    }
    return conversation;
  }
}
