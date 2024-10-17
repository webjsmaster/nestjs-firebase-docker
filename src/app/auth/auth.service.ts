import { Body, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { FirebaseAuthService } from '../../firebase/firebase-auth.service';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseAuthService: FirebaseAuthService) {}

  signUp(@Body() userDTO: UserDto) {
    return this.firebaseAuthService.signUp(userDTO);
  }

  signIn(@Body() userDTO: UserDto) {
    return this.firebaseAuthService.signIn(userDTO);
  }

  logOut() {
    return this.firebaseAuthService.signOut();
  }

  checkAuth() {
    return this.firebaseAuthService.checkAuth();
  }
}
