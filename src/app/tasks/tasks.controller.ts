import { Controller, Get, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { TaskDto } from './dto/tasks.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  async writeData(@Body() data: TaskDto) {
    await this.firebaseService.writeDataBase('tasks', data);
    return { message: 'Data written successfully' };
  }

  @Get()
  async readData() {
    const data = await this.firebaseService.readDataBase('posts');

    // console.log('💡:', data);
    return data;
  }
}
