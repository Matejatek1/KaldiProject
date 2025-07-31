import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from 'src/conversations/conversation.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getConversations(id: number): Promise<Conversation[] | undefined> {
    return (await this.getUserFromId(id)).conversations;
  }

  async findOne(username: string, password: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username, password } });
  }

  async getUserFromId(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
