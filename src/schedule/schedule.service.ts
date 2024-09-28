import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { ScheduleEntity } from 'src/schedule/entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(private readonly db: DataService) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<ScheduleEntity> {
    return this.db.schedule.create({ data: createScheduleDto });
  }

  async findAll(): Promise<Array<ScheduleEntity>> {
    return this.db.schedule.findMany();
  }

  async findOne(uuid: string): Promise<ScheduleEntity> {
    return this.db.schedule.findUniqueOrThrow({ where: { id: uuid } });
  }

  async update(
    uuid: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleEntity> {
    return this.db.schedule.update({
      data: updateScheduleDto,
      where: { id: uuid },
    });
  }

  async remove(uuid: string): Promise<ScheduleEntity> {
    return this.db.schedule.delete({ where: { id: uuid } });
  }
}
