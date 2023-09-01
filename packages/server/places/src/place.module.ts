import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './place.entity';
import { TypeOrmConfigService } from './services/postgress-config.service';
import { ConfigService } from './services/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([Place]),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, ConfigService],
})
export class PlaceModule {}
