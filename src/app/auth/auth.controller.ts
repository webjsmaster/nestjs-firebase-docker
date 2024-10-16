import { Body, Controller, Get, Post } from '@nestjs/common';
import { FirebaseAuthService } from '../../firebase/firebase-auth.service';
import { LoginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDTO: LoginUserDto) {
    return this.authService.login(userDTO);
  }

  @Post('/logout')
  logout() {
    return this.authService.logOut();
  }

  @Get('/user')
  user() {
    return this.authService.checkAuth(); // Replace with actual user data
  }
}
