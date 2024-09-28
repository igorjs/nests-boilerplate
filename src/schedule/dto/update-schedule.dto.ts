import { PartialType } from '@nestjs/swagger';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
