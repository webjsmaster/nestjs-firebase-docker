import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Controller('test')
export class TestController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('write')
  async writeData(@Body() data: any) {
    await this.firebaseService.writeDataBase('test/path', data);
    return { message: 'Data written successfully' };
  }

  @Get()
  async readData() {
    const data = await this.firebaseService.readDataBase();

    console.log('💡:', data);
    return data;
  }
}
