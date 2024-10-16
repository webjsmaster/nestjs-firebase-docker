import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthService } from '../../firebase/firebase-auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthService],
  exports: [AuthService],
})
export class AuthModule {}
