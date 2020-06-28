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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) { }

  async register(credentials: RegistrationDto) {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
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
      if (user && user.comparePassword(password)) {
        return user;
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
