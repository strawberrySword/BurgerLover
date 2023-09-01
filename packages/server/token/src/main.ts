import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { TokenModule } from './token.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3004,
    },
  } as TcpOptions);
  await app.listen();
}
bootstrap();
