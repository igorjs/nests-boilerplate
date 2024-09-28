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
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { ScheduleEntity } from 'src/schedule/entities/schedule.entity';
import { ScheduleService } from 'src/schedule/schedule.service';

@ApiTags('Schedules')
@ApiProduces('application/json')
@Controller({ version: '1', path: 'schedules' })
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Created', type: ScheduleEntity })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    const schedule = await this.scheduleService.create(createScheduleDto);

    if (!schedule?.id) {
      throw new BadRequestException();
    }

    return schedule;
  }

  @Get()
  @ApiOkResponse({ type: ScheduleEntity, isArray: true })
  async findAll() {
    return this.scheduleService.findAll();
  }

  @Get(':uuid')
  @ApiOkResponse({ type: ScheduleEntity })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const schedule = await this.scheduleService.findOne(uuid);

    if (!schedule?.id) {
      throw new NotFoundException('Schedule not found with ID: ' + uuid);
    }
    return schedule;
  }

  @Patch(':uuid')
  @ApiOkResponse({ description: 'Success', type: ScheduleEntity })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    const schedule = await this.scheduleService.update(uuid, updateScheduleDto);

    if (!schedule?.id) {
      throw new NotFoundException('Schedule not found with ID: ' + uuid);
    }
    return schedule;
  }

  @Delete(':uuid')
  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const schedule = await this.scheduleService.remove(uuid);

    if (!schedule?.id) {
      throw new NotFoundException('Schedule not found with ID: ' + uuid);
    }
    return schedule;
  }
}
