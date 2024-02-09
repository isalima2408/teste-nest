import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatosModule } from './gatos/gatos.module';

@Module({
  imports: [GatosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
