import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Conversation } from 'src/conversations/conversation.entity';
import { ConversationsService } from 'src/conversations/conversations.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { MessageDto } from 'src/dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject(forwardRef(() => ConversationsService))
    private readonly conversationService: ConversationsService,
    @InjectMapper() private readonly classMapper: Mapper
  ) {}
  async addMessage(
    message: string,
    conversationId: number,
    userId: number
  ): Promise<MessageDto> {
    const conversation: Conversation =
      await this.conversationService.getConversationById(conversationId);
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`
      );
    }
    if (
      !(conversation.user?.id == userId) &&
      !(conversation.worker?.id == userId)
    ) {
      throw new NotFoundException(
        `You do not have access to this conversation.`
      );
    }
    const messageEntity: Message = this.messageRepository.create({
      message: message,
      conversation: conversation,
      senderId: userId,
    });
    return this.classMapper.map(
      await this.messageRepository.save(messageEntity),
      Message,
      MessageDto
    );
  }
}
