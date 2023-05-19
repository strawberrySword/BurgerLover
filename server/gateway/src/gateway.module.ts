import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ConfigService } from './services/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [GatewayController],
  providers: [
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const userOptions = configService.get('userService');
        return ClientProxyFactory.create(userOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
