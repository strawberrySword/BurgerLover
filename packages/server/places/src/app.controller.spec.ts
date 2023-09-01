import { Test, TestingModule } from '@nestjs/testing';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';

describe('AppController', () => {
  let appController: PlaceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [PlaceService],
    }).compile();

    appController = app.get<PlaceController>(PlaceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
