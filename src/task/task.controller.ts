import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { TaskEntity } from 'src/task/entities/task.entity';
import { TaskService } from 'src/task/task.service';

@ApiTags('Tasks')
@ApiProduces('application/json')
@Controller({ version: '1', path: 'tasks' })
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    const task = await this.taskService.create(createTaskDto);

    if (!task?.id) {
      throw new BadRequestException();
    }

    return task;
  }

  @Get()
  @ApiOkResponse({ type: TaskEntity, isArray: true })
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':uuid')
  @ApiOkResponse({ type: TaskEntity })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const task = await this.taskService.findOne(uuid);

    if (!task?.id) {
      throw new NotFoundException();
    }

    return task;
  }

  @Patch(':uuid')
  @ApiOkResponse({ description: 'Success', type: TaskEntity })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskService.update(uuid, updateTaskDto);

    if (!task?.id) {
      throw new NotFoundException();
    }

    return task;
  }

  @Delete(':uuid')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const task = await this.taskService.remove(uuid);

    if (!task?.id) {
      throw new NotFoundException();
    }

    return task;
  }
}
