import { AutoMap } from '@automapper/classes';
import { Conversation } from 'src/conversations/conversation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @AutoMap()
  @Column()
  senderId: number;
  @AutoMap()
  @Column()
  message: string;
}
