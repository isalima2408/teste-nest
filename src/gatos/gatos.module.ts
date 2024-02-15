import { Module } from '@nestjs/common';
import { GatosController } from './gatoscontroller';
import { GatosService } from './gatos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gato } from './entities/gatos.entity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gato, Tag])], // o import da entidade no service so funciona se importar isso aqui no modulo
  controllers: [GatosController],
  providers: [GatosService],
})
export class GatosModule {}
