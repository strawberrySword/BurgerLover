import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GatewayModule } from './gateway.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  });
  app.use(cookieParser());
  const options = new DocumentBuilder()
    .setTitle('Burger App')
    .addTag('users')
    .addTag('places')
    .setVersion('1.0')
    .build();
  const ducument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, ducument);
  await app.listen(3000);
}
bootstrap();
