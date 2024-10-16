import { Injectable } from '@nestjs/common';
import {
  getAuth,
  signInWithEmailAndPassword,
  Auth,
  signOut,
} from 'firebase/auth';

@Injectable()
export class FirebaseAuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth();
  }

  public signIn() {
    signInWithEmailAndPassword(this.auth, 'test1@test.ru', '12345678')
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log('🚀:', userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  public signOut() {
    signOut(this.auth)
      .then((data) => {
        // Signed in
        console.log('🧬:', data);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
