import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.users.findOne(username, password);
    if (user) {
      return user;
    }
    return null;
  }
}
