import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('PLACES_SERVICE') private readonly placesServiceClient: ClientProxy,
  ) {}

  async getHello(): Promise<{ username: string; password: string }> {
    return await firstValueFrom(
      this.placesServiceClient.send({ cmd: 'getHello' }, {}),
    );
  }
}
