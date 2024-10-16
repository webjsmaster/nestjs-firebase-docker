import { Injectable } from '@nestjs/common';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  signOut,
} from 'firebase/auth';
import { LoginUserDto } from '../app/auth/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FirebaseAuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  public signIn(userDTO: LoginUserDto) {
    return signInWithEmailAndPassword(
      this.auth,
      userDTO.email,
      userDTO.password,
    )
      .then((userCredential) => {
        return {
          message: `Signing in success: ✅ ${userCredential.user.email}`,
        };
      })
      .catch((error) => {
        const errorMessage = error.message;
        throw new UnauthorizedException(
          `Failed authenticate user: ${errorMessage}`,
        );
      });
  }

  public signOut() {
    return signOut(this.auth)
      .then((data) => {
        return { message: 'Sign out successful' };
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw new BadRequestException(
          `Failed to log out: ${errorMessage} ${errorCode}`,
        );
      });
  }

  public checkAuth() {
    const user = this.auth.currentUser;
    if (user) {
      console.log('🍄:', user.email);
    }
  }
}
