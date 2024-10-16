import { Body, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/user.dto';
import { FirebaseAuthService } from '../../firebase/firebase-auth.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  login(@Body() userDTO: LoginUserDto) {
    return this.firebaseAuthService.signIn(userDTO);
  }

  logOut() {
    return this.firebaseAuthService.signOut();
  }

  checkAuth() {
    return this.firebaseAuthService.checkAuth();
  }
}
