import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataModule } from 'src/data/data.module';
import { DataService } from 'src/data/data.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { TaskType } from 'src/task/enums/task-type.enum';
import { TaskController } from 'src/task/task.controller';
import { TaskService } from 'src/task/task.service';

describe('TaskController', () => {
  let controller: TaskController;

  const mockDataService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
      imports: [DataModule],
    })
      .overrideProvider(DataService)
      .useValue(mockDataService)
      .compile();

    controller = module.get<TaskController>(TaskController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // HAPPY PATH
  it('should create a new task when provided with valid data', async () => {
    mockDataService.task.create.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
      accountId: 1,
      startTime: new Date('2023-01-01T00:00:00Z'),
      duration: 1,
      type: TaskType.WORK,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createTaskDto: CreateTaskDto = {
      scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
      accountId: 1,
      startTime: new Date('2023-01-01T00:00:00Z'),
      duration: 1,
      type: TaskType.WORK,
    };

    const result = await controller.create(createTaskDto);

    expect(mockDataService.task.create).toHaveBeenCalledWith({
      data: createTaskDto,
    });
    expect(result).toBeDefined();
    expect(result.id).toEqual('4fb30b9d-2623-41f6-b995-b0b11afcd556');
  });

  it('should throw an error when provided with invalid data', async () => {
    mockDataService.task.create.mockRejectedValue(new Error('Invalid data'));
    const createTaskDto: CreateTaskDto = {
      scheduleId: null,
      accountId: 1,
      startTime: new Date('2023-01-01T00:00:00Z'),
      duration: 1,
      type: TaskType.WORK,
    };
    await expect(controller.create(createTaskDto)).rejects.toThrow(
      'Invalid data',
    );
  });

  it('should retrieve all tasks successfully', async () => {
    mockDataService.task.findMany.mockResolvedValue([
      {
        id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
        scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
        accountId: 1,
        startTime: new Date('2023-01-01T00:00:00Z'),
        duration: 1,
        type: TaskType.WORK,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
        scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
        accountId: 1,
        startTime: new Date('2023-01-01T00:00:00Z'),
        duration: 1,
        type: TaskType.BREAK,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await controller.findAll();
    expect(result).toHaveLength(2);
    expect(mockDataService.task.findMany).toHaveBeenCalled();
  });

  it('should find a specific task by UUID successfully', async () => {
    mockDataService.task.findUniqueOrThrow.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
      accountId: 1,
      startTime: new Date('2023-01-01T00:00:00Z'),
      duration: 1,
      type: TaskType.WORK,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const uuid = '4fb30b9d-2623-41f6-b995-b0b11afcd556';
    const result = await controller.findOne(uuid);
    expect(result.id).toEqual(uuid);
    expect(mockDataService.task.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: uuid },
    });
  });

  it('should update a task successfully and return the updated entity', async () => {
    mockDataService.task.update.mockResolvedValue({
      id: '4fb30b9d-2623-41f6-b995-b0b11afcd556',
      scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
      accountId: 1,
      startTime: new Date('2023-01-01T00:00:00Z'),
      duration: 1,
      type: TaskType.BREAK,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const uuid = '4fb30b9d-2623-41f6-b995-b0b11afcd556';

    const updateTaskDto = {
      type: TaskType.BREAK,
    };
    const result = await controller.update(uuid, updateTaskDto);
    expect(result.id).toEqual(uuid);
    expect(mockDataService.task.update).toHaveBeenCalledWith({
      data: updateTaskDto,
      where: { id: uuid },
    });
  });

  // EDGE CASES
  it('should throw BadRequestException when creating a task with invalid data', async () => {
    mockDataService.task.create.mockResolvedValue(null);

    const createTaskDto: any = {
      accountId: 1, // Missing other required fields
    };

    await expect(controller.create(createTaskDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw NotFoundException when updating a non-existent task', async () => {
    mockDataService.task.update.mockResolvedValue(null);

    const updateTaskDto: any = {
      scheduleId: 'a5bafd02-326d-4cc6-9e69-0d2a809eebab',
      type: TaskType.BREAK,
    };

    const uuid = 'non-existent-uuid';

    await expect(controller.update(uuid, updateTaskDto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockDataService.task.update).toHaveBeenCalledWith({
      data: updateTaskDto,
      where: { id: uuid },
    });
  });
});
