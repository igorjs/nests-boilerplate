import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';

export class ScheduleEntity implements Schedule {
  @ApiProperty()
  id: string;
  @ApiProperty()
  accountId: number;
  @ApiProperty()
  agentId: number;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  endTime: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
