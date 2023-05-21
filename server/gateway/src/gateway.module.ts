import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { ConfigService } from './services/config/config.service';
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
    {
      provide: 'PLACES_SERVICE',
      useFactory: (configService: ConfigService) => {
        const placesOptions = configService.get('placesService');
        return ClientProxyFactory.create(placesOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class GatewayModule {}
