import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [DataModule],
})
export class TaskModule {}
