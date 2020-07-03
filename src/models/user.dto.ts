import {} from 'class-validator';

export class LoginDto {
  email: string;
  password: string;
}

export class RegistrationDto extends LoginDto {
  username: string;
}
