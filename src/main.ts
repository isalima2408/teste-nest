import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // usar pipe para validar dados. Só funciona após instalação da class validator
  // essa validação faz com que se for enviado json com dados a mais, por exemplo se eu enviar a "idade" do gato,
  // a validação vai remover o campo idade, pois ele nao esta definido no DTO do Gato
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,

    // ao ter campo "a mais", ele retorna "Bad Request", e nao aceita a requisição
    forbidNonWhitelisted: true,

    // transforma a string vinda da requisição em outro tipo informado
    transform: true,
  }))
  await app.listen(3016);
}
bootstrap();
