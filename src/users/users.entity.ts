import { Conversation } from 'src/conversations/conversation.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isOperator: boolean; // 'user' or 'operator'

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversations: Conversation[];
}
