import { Injectable } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { TaskEntity } from 'src/task/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly db: DataService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.db.task.create({ data: createTaskDto });
  }

  async findAll(): Promise<Array<TaskEntity>> {
    return this.db.task.findMany();
  }

  async findOne(uuid: string): Promise<TaskEntity> {
    return this.db.task.findUniqueOrThrow({ where: { id: uuid } });
  }

  async update(
    uuid: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    return this.db.task.update({ data: updateTaskDto, where: { id: uuid } });
  }

  async remove(uuid: string): Promise<TaskEntity> {
    return this.db.task.delete({ where: { id: uuid } });
  }
}
