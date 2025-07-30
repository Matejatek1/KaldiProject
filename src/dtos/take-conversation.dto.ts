import { AutoMap } from '@automapper/classes';
import { MessageDto } from './message.dto';

export class TakeConversationDto {
  messages: Array<MessageDto>;
  @AutoMap()
  senderId: number;
  @AutoMap()
  senderName: string;
  @AutoMap()
  roomId: number;
}
