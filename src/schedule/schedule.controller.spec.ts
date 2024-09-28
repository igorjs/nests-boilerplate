import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataModule } from 'src/data/data.module';
import { DataService } from 'src/data/data.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { ScheduleController } from 'src/schedule/schedule.controller';
import { ScheduleService } from 'src/schedule/schedule.service';

describe('ScheduleController', () => {
  let controller: ScheduleController;

  const mockDataService = {
    schedule: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScheduleController],
      providers: [ScheduleService],
      imports: [DataModule],
    })
      .overrideProvider(DataService)
      .useValue(mockDataService)
      .compile();

    controller = module.get<ScheduleController>(ScheduleController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // HAPPY PATH
  it('should create a new schedule when provided with valid data', async () => {
    mockDataService.schedule.create.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      accountId: 1,
      agentId: 2,
      startTime: new Date('2023-01-01T00:00:00Z'),
      endTime: new Date('2023-01-02T00:00:00Z'),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createScheduleDto: CreateScheduleDto = {
      accountId: 1,
      agentId: 2,
      startTime: new Date('2023-01-01T00:00:00Z'),
      endTime: new Date('2023-01-02T00:00:00Z'),
    };

    const result = await controller.create(createScheduleDto);

    expect(mockDataService.schedule.create).toHaveBeenCalledWith({
      data: createScheduleDto,
    });
    expect(result).toBeDefined();
    expect(result.id).toEqual('4fb30b9d-2623-41f6-b995-b0b11afcd556');
  });

  it('should throw an error when provided with invalid data', async () => {
    mockDataService.schedule.create.mockRejectedValue(
      new Error('Invalid data'),
    );
    const createScheduleDto: CreateScheduleDto = {
      accountId: null, // Invalid data
      agentId: 2,
      startTime: new Date('2023-01-01T00:00:00Z'),
      endTime: new Date('2023-01-02T00:00:00Z'),
    };
    await expect(controller.create(createScheduleDto)).rejects.toThrow(
      'Invalid data',
    );
  });

  it('should retrieve all schedules successfully', async () => {
    mockDataService.schedule.findMany.mockResolvedValue([
      {
        id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
        accountId: 1,
        agentId: 2,
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
        accountId: 3,
        agentId: 4,
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await controller.findAll();
    expect(result).toHaveLength(2);
    expect(mockDataService.schedule.findMany).toHaveBeenCalled();
  });

  it('should find a specific schedule by UUID successfully', async () => {
    mockDataService.schedule.findUniqueOrThrow.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      accountId: 1,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const uuid = '4fb30b9d-2623-41f6-b995-b0b11afcd556';
    const result = await controller.findOne(uuid);
    expect(result.id).toEqual(uuid);
    expect(mockDataService.schedule.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: uuid },
    });
  });

  it('should update a schedule successfully and return the updated entity', async () => {
    mockDataService.schedule.update.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      accountId: 1,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const uuid = '4fb30b9d-2623-41f6-b995-b0b11afcd556';

    const updateScheduleDto = {
      accountId: 1,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
    };
    const result = await controller.update(uuid, updateScheduleDto);
    expect(result.id).toEqual(uuid);
    expect(mockDataService.schedule.update).toHaveBeenCalledWith({
      data: updateScheduleDto,
      where: { id: uuid },
    });
  });

  // EDGE CASES
  it('should throw BadRequestException when creating a schedule with invalid data', async () => {
    mockDataService.schedule.create.mockResolvedValue(null);

    const createScheduleDto: any = {
      accountId: 1, // Missing other required fields
    };

    await expect(controller.create(createScheduleDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when updating a non-existent schedule', async () => {
    mockDataService.schedule.update.mockResolvedValue(null);

    const updateScheduleDto: UpdateScheduleDto = {
      accountId: 1,
      agentId: 2,
      startTime: new Date(),
      endTime: new Date(),
    };

    const uuid = 'non-existent-uuid';

    await expect(controller.update(uuid, updateScheduleDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockDataService.schedule.update).toHaveBeenCalledWith({
      data: updateScheduleDto,
      where: { id: uuid },
    });
  });
});
