import { Test, TestingModule } from '@nestjs/testing';
import { GatosController } from './gatoscontroller';

describe('GatosController', () => {
  let controller: GatosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatosController],
    }).compile();

    controller = module.get<GatosController>(GatosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
