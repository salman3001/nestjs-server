import { Test, TestingModule } from '@nestjs/testing';
import { BuyzoneController } from './buyzone.controller';
import { BuyzoneService } from './buyzone.service';

describe('BuyzoneController', () => {
  let buyzoneController: BuyzoneController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BuyzoneController],
      providers: [BuyzoneService],
    }).compile();

    buyzoneController = app.get<BuyzoneController>(BuyzoneController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(buyzoneController.getHello()).toBe('Hello World!');
    });
  });
});
