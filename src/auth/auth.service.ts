import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'jane.doe@gmail.com',
    token: 'jwt.token.here',
    user: 'jane.doe',
    bio: 'this is a bio',
    image: null,
  };

  register() {
    return this.mockUser;
  }

  login(credentials: any) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }

    throw new InternalServerErrorException();
  }
}
