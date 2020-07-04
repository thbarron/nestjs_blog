import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { AuthPayload } from '../models/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      secretOrKey: process.env.SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthPayload) {
    const { username } = payload;
    const user = await this.userRepo.find({ where: { username } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
