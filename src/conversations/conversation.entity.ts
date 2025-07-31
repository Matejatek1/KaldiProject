import { AutoMap } from '@automapper/classes';
import { Message } from 'src/messages/message.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @AutoMap()
  @Column()
  userName: string;

  @ManyToOne(() => Room, (room) => room.conversations)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ name: 'workerId' })
  worker: User;

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @Column({ default: 0 })
  status: number;
}
