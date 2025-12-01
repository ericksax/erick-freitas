import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schemas/user.schema';
import configuration from 'src/config/configuration';
import { RegisterDto } from './dto/register.dto';

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

  async register(dto: RegisterDto) {
    const { email, name, password } = dto;

    const hashed = await this.hash(password);
    const user: UserDocument = await this.users.createUser({
      email,
      password: hashed,
      name,
    });

    return this.generateTokens(user);
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Unalthorized');

    const match = await this.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Unalthorized');

    return this.generateTokens(user);
  }

  private async generateTokens(user: UserDocument) {
    const payload = { sub: user._id.toString(), email: user.email };

    const access_token = this.jwt.sign(payload, {
      expiresIn: parseInt(configuration().jwt.expiresIn),
    });

    const refresh_token = this.jwt.sign(payload, {
      expiresIn: parseInt(configuration().jwt.refreshTokenExpiresIn),
      secret: configuration().jwt.refreshSecret,
    });

    const hash = await this.hash(refresh_token);
    await this.users.saveRefreshToken(user._id.toString(), hash);

    return {
      access_token,
      refresh_token,
      user: { email: user.email, name: user.name, id: user._id },
    };
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.users.findById(userId);
    if (!user || !user.refreshToken)
      throw new UnauthorizedException({
        message: 'Unalthorized',
      });

    const match = await this.compare(refreshToken, user.refreshToken);
    if (!match)
      throw new UnauthorizedException({
        message: 'Unalthorized',
      });

    return this.generateTokens(user);
  }
}
