import { ApiProperty } from '@nestjs/swagger';
import { Task, TaskType } from '@prisma/client';

export class TaskEntity implements Task {
  @ApiProperty()
  id: string;
  @ApiProperty()
  accountId: number;
  @ApiProperty()
  scheduleId: string;
  @ApiProperty()
  startTime: Date;
  @ApiProperty()
  duration: number;
  @ApiProperty({ enum: TaskType, enumName: 'TaskTypeEnum' })
  type: TaskType;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
