import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  conversationId: number;
  @AutoMap()
  @Column()
  senderId: number;
  @AutoMap()
  @Column()
  message: string;
}
