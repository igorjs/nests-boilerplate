import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from './schedule/schedule.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ScheduleModule, TaskModule],
  controllers: [AppController],
})
export class AppModule {}
