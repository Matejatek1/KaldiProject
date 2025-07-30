import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.users.findOne(username, password);
    if (user) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const payload = { name: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
