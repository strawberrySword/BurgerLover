import { Controller } from '@nestjs/common';
import { PlacesService } from './places.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PlacesController {
  constructor(private readonly userService: PlacesService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(): { username: string; password: string } {
    return { username: 'john', password: 'yesss' };
  }
}
