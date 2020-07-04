import {
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto, RegistrationDto } from '../models/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegistrationDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJson(), token } };
    } catch (err) {
      if (err === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      const validPassword = await user.comparePassword(password);
      if (user && validPassword) {
        const payload = { username: user.username };
        const token = this.jwtService.sign(payload);
        return { user: { ...user.toJson(), token } };
      }
      throw new UnauthorizedException('Invalid credentials.');
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
