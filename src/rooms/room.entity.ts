import { Conversation } from 'src/conversations/conversation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // 'tech', 'services', 'chat'

  @OneToMany(() => Conversation, (conversation) => conversation.room)
  conversations: Conversation[];
}
