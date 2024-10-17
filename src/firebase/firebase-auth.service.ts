import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { UserDto } from '../app/auth/dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FirebaseAuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  public async signUp({ email, password }: UserDto) {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return {
        message: `Signing up success: ✅ ${response.user.email}`,
      };
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        throw new ConflictException(`User with this email already exists`);
      } else {
        throw new BadRequestException(`Failed to sign up: ${error.message}`);
      }
    }
  }

  public async signIn({ email, password }: UserDto) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      return {
        message: `Signing in success: ✅ ${userCredential.user.email}`,
      };
    } catch (error) {
      const errorMessage = error.message;
      throw new UnauthorizedException(
        `Failed authenticate user: ${errorMessage}`,
      );
    }
  }

  public async signOut() {
    try {
      await signOut(this.auth);
      return { message: 'Sign out successful' };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new BadRequestException(
        `Failed to log out: ${errorMessage} ${errorCode}`,
      );
    }
  }

  public checkAuth() {
    const user = this.auth.currentUser;
    if (user) {
      return { message: `User: ✅ ${user.email} authenticated` };
    } else {
      throw new ForbiddenException(`User not authorized`);
    }
  }
}
