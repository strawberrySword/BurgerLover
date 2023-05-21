import { Controller, Get, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
  ) {}

  @Get('/users')
  async getHello(): Promise<{ username: string; password: string }> {
    const userResponse: { username: string; password: string } =
      await firstValueFrom(
        this.userServiceClient.send({ cmd: 'getHello' }, {}),
      );
    return userResponse;
  }
}
