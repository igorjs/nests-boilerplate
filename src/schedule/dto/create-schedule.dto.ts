import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '@prisma/client';
import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateScheduleDto implements Partial<Schedule> {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  accountId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  agentId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startTime: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endTime: Date;
}
