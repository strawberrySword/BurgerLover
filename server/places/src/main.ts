import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { PlacesModule } from './places.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PlacesModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3002,
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
