import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() userDTO: UserDto) {
    return this.authService.signUp(userDTO);
  }

  @Post('/sign-in')
  sigIn(@Body() userDTO: UserDto) {
    return this.authService.signIn(userDTO);
  }

  @Post('/logout')
  logout() {
    return this.authService.logOut();
  }

  @Get()
  user() {
    return this.authService.checkAuth();
  }
}
