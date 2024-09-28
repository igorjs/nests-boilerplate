import { Test, TestingModule } from '@nestjs/testing';
import { DataModule } from 'src/data/data.module';
import { DataService } from 'src/data/data.service';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';
import { TaskService } from 'src/task/task.service';

describe('TaskService', () => {
  let service: TaskService;

  const mockDataService = {
    task: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const uuid = '6ca78f3b-46d9-4f09-bf7f-241fa621139a';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
      imports: [DataModule],
    })
      .overrideProvider(DataService)
      .useValue(mockDataService)
      .compile();

    service = module.get<TaskService>(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the service defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.task, 'findMany');
    });

    it('should be defined', () => {
      expect(service.findAll()).toBeDefined();
    });

    it('should call the database', () => {
      service.findAll();
      expect(mockDataService.task.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.task, 'findUniqueOrThrow');
    });

    it('should be defined', () => {
      expect(service.findOne(uuid)).toBeDefined();
    });

    it('should call the database', () => {
      service.findOne(uuid);
      expect(mockDataService.task.findUniqueOrThrow).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.task, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as CreateTaskDto);
      expect(mockDataService.task.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.task, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update(uuid, {} as UpdateTaskDto);
      expect(mockDataService.task.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.task, 'delete');
    });

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should call the database', () => {
      service.remove(uuid);
      expect(mockDataService.task.delete).toHaveBeenCalledTimes(1);
    });
  });
});
