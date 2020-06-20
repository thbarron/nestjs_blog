import {} from 'class-validator';

export class LoginDTO {
  email: string;
  password: string;
}

export class Registration extends LoginDTO {}
