import { Test, TestingModule } from '@nestjs/testing';
import { DataModule } from 'src/data/data.module';
import { DataService } from 'src/data/data.service';
import { CreateScheduleDto } from 'src/schedule/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/schedule/dto/update-schedule.dto';
import { ScheduleService } from 'src/schedule/schedule.service';

describe('ScheduleService', () => {
  let service: ScheduleService;

  const mockDataService = {
    schedule: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const uuid = 'e3960f30-8cee-4f1c-8b32-b8798cc27a0b';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
      imports: [DataModule],
    })
      .overrideProvider(DataService)
      .useValue(mockDataService)
      .compile();

    service = module.get<ScheduleService>(ScheduleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the service defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.schedule, 'findMany');
    });

    it('should be defined', () => {
      expect(service.findAll()).toBeDefined();
    });

    it('should call the database', () => {
      service.findAll();
      expect(mockDataService.schedule.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.schedule, 'findUniqueOrThrow');
    });

    it('should be defined', () => {
      expect(service.findOne(uuid)).toBeDefined();
    });

    it('should call the database', () => {
      service.findOne(uuid);
      expect(mockDataService.schedule.findUniqueOrThrow).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('create', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.schedule, 'create');
    });

    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call the database', () => {
      service.create({} as CreateScheduleDto);
      expect(mockDataService.schedule.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.schedule, 'update');
    });

    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should call the database', () => {
      service.update(uuid, {} as UpdateScheduleDto);
      expect(mockDataService.schedule.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      jest.spyOn(mockDataService.schedule, 'delete');
    });

    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should call the database', () => {
      service.remove(uuid);
      expect(mockDataService.schedule.delete).toHaveBeenCalledTimes(1);
    });
  });
});
