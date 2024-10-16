import { Module } from '@nestjs/common';
import { FirebaseModule } from '../../firebase/firebase.module';
import { TestController } from './test.controller';

@Module({
  imports: [FirebaseModule],
  controllers: [TestController],
})
export class TestModule {}
