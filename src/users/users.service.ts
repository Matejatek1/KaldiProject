import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOne(username: string, password: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username, password } });
  }

  async getUserFromId(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
