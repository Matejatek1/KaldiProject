import { AutoMap } from '@automapper/classes';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;
  @AutoMap()
  @Column()
  userId: number;
  @AutoMap()
  @Column()
  userName: string;
  @AutoMap()
  @Column()
  room: number;

  @Column({ nullable: true })
  workerId: number | null;

  @Column({ default: 0 })
  status: number; // 0: 'waiting' or 1: 'taken'
}
