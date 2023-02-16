import { Test, TestingModule } from '@nestjs/testing';
import { BuyzoneController } from './buyzone.controller';
import { BuyzoneService } from './buyzone.service';

describe('BuyzoneController', () => {
  let controller: BuyzoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyzoneController],
      providers: [BuyzoneService],
    }).compile();

    controller = module.get<BuyzoneController>(BuyzoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
