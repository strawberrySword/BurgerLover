import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { PlaceModule } from './place.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PlaceModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
