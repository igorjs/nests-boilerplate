import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { ScheduleController } from 'src/schedule/schedule.controller';
import { ScheduleService } from 'src/schedule/schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [DataModule],
})
export class ScheduleModule {}
