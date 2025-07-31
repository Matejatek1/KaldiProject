import { AutoMap } from '@automapper/classes';
import { Message } from 'src/messages/message.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, user => user.conversations)
  user: User;
  @AutoMap()
  @Column()
  userName: string;
  
  @ManyToOne(() => Room, room => room.conversations)
  room: Room;

  @ManyToOne(() => User, user => user.conversations)
  worker: User;

  @OneToMany(() => Message, message => message.conversation)
  messages: Message[];

  @Column({ default: 0 })
  status: number; 
}
