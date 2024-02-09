import { Module } from '@nestjs/common';
import { GatosController } from './gatoscontroller';
import { GatosService } from './gatos.service';

@Module({
  controllers: [GatosController],
  providers: [GatosService],
})
export class GatosModule {}
