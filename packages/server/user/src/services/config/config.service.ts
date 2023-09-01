import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.port = process.env.API_GATEWAY_PORT || 3000;
    this.envConfig.placesService = {
      transport: Transport.TCP,
      options: {
        port: process.env.PLACES_SERVICE_PORT || 3002,
        host: process.env.PLACES_SERVICE_HOST || 'localhost',
      },
    };
  }
  get(key: string): any {
    return this.envConfig[key];
  }
}
