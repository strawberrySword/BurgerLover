import { Module } from '@nestjs/common';
// import { ClientProxyFactory } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';
import { ConfigService } from './services/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
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
export class UserModule {}
