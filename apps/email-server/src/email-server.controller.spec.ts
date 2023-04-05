import { Test, TestingModule } from '@nestjs/testing';
import { EmailServerController } from './email-server.controller';
import { EmailServerService } from './email-server.service';

describe('EmailServerController', () => {
  let emailServerController: EmailServerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmailServerController],
      providers: [EmailServerService],
    }).compile();

    emailServerController = app.get<EmailServerController>(EmailServerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(emailServerController.getHello()).toBe('Hello World!');
    });
  });
});
