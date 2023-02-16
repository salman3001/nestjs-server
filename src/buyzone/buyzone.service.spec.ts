import { Test, TestingModule } from '@nestjs/testing';
import { BuyzoneService } from './buyzone.service';

describe('BuyzoneService', () => {
  let service: BuyzoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyzoneService],
    }).compile();

    service = module.get<BuyzoneService>(BuyzoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
