import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../firebase/firebase.module';
import { TasksController } from './tasks.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [TasksController],
})
export class TasksModule {}
