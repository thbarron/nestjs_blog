import { MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegistrationDto extends LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}

export interface AuthPayload {
  username: string;
}
