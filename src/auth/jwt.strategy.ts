import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SuperSeacret',
    });
  }
  async validate(payload: any) {
    if (payload.exp < Date.now() / 1000) {
      throw new TokenExpiredError(
        'The token provided has expired.',
        payload.exp
      );
    }
    const user = await this.userService.getUserFromId(payload.sub);
    return {
      id: payload.sub,
      operator: user.isOperator,
      name: payload.name,
    };
  }
}
