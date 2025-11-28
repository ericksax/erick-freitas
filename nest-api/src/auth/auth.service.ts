import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import configuration from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  private hash(data: string) {
    return bcrypt.hash(data, 10);
  }

  private compare(data: string, hash: string) {
    return bcrypt.compare(data, hash);
  }

  async register(dto: { email: string; password: string }) {
    const exists = await this.users.findByEmail(dto.email);

    if (exists) throw new UnauthorizedException('Email já existe');

    const hashed = await this.hash(dto.password);
    const user = await this.users.createUser(dto.email, hashed);

    return this.generateTokens(user);
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const match = await this.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Credenciais inválidas');

    return this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload = { sub: user._id.toString(), email: user.email };

    const access_token = this.jwt.sign(payload, {
      expiresIn: Number(configuration().jwt.expiresIn),
    });

    const refresh_token = this.jwt.sign(payload, {
      expiresIn: Number(configuration().jwt.refreshTokenExpiresIn),
      secret: configuration().jwt.refreshSecret,
    });

    const hash = await this.hash(refresh_token);
    await this.users.saveRefreshToken(user._id.toString(), hash);

    return {
      access_token,
      refresh_token,
      user: { email: user.email, id: user._id },
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.users.findById(userId);
    if (!user || !user.refreshToken)
      throw new UnauthorizedException({
        message: 'Credenciais inválidas',
      });

    const match = await this.compare(refreshToken, user.refreshToken);
    if (!match)
      throw new UnauthorizedException({
        message: 'Credenciais inválidas',
      });

    return this.generateTokens(user);
  }
}
