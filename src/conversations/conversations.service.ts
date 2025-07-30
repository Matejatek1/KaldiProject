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

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesService: MessagesService,
    private readonly roomRepository: RoomsService,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}

  async getConversationById(conversationId: number): Promise<Conversation> {
    return this.conversationsRepository.findOneBy({ id: conversationId });
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
      await this.conversationsRepository.findOneBy({ id: conversationId });
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`
      );
    }
    if (conversation.workerId != null) {
      throw new BadRequestException(
        `The conversation already has an assigned worker.`
      );
    }
    conversation.workerId = userId;
    conversation.status = 1;
    const savedConversation: Conversation =
      await this.conversationsRepository.save(conversation);
    const messages = await this.messagesService.getAllMessagesFromConversation(
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
    userId: number,
    userName: string,
    isOperator: boolean
  ): Promise<Conversation> {
    const room = await this.roomRepository.getRoomById(roomId);
    if (room == null) {
      throw new NotFoundException(`Room was not found.`);
    }
    if (isOperator) {
      throw new UnauthorizedException(
        `You are an operator and can not start new conversations.`
      );
    }
    const newConversation = await this.conversationsRepository.create({
      userId: userId,
      userName: userName,
      room: roomId,
      status: 0,
    });
    return await this.conversationsRepository.save(newConversation);
  }

  async continueConversation(
    userId: number,
    isOperator: boolean
  ): Promise<Array<Conversation>> {
    if (isOperator) {
      const conversation: Array<Conversation> =
        await this.conversationsRepository.find({
          where: { workerId: userId },
        });
      if (conversation == null) {
        throw new NotFoundException(`Conversations were not found.`);
      }
      return conversation;
    }
    const conversation: Array<Conversation> =
      await this.conversationsRepository.find({
        where: { userId: userId },
      });
    if (conversation == null) {
      throw new NotFoundException(`Conversations were not found.`);
    }
    return conversation;
  }
}
