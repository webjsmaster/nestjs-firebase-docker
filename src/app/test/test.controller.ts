import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { response } from 'express';
import { FirebaseAuthService } from '../../firebase/firebase-auth.service';

@Controller('test')
export class TestController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly firebaseAuthService: FirebaseAuthService,
  ) {}

  @Post('write')
  async writeData(@Body() data: any) {
    await this.firebaseService.writeDataBase('test/path', data);
    return { message: 'Data written successfully' };
  }

  @Get('posts')
  async readData() {
    const data = await this.firebaseService.readDataBase('posts');

    // console.log('💡:', data);
    return data;
  }

  @Get('auth')
  async authData() {
    const data = await this.firebaseAuthService.signIn();

    // console.log('💡:', data);
    return data;
  }

  @Get('out')
  async logoutData() {
    const data = await this.firebaseAuthService.signOut();

    // console.log('💡:', data);
    return data;
  }
}
