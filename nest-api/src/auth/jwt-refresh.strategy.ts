import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configuration from '../config/configuration';

export interface JwtRefreshPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: configuration().jwt.refreshSecret,
      passReqToCallback: true,
    } as const);
  }

  validate(
    req: { body: { refresh_token: string } },
    payload: JwtRefreshPayload,
  ) {
    const token: string = req.body?.refresh_token;

    if (!token) {
      throw new UnauthorizedException('Refresh token is required');
    }

    return { userId: payload.sub, token };
  }
}
