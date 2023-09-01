import { Controller } from '@nestjs/common';
import { PlaceService } from './place.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class PlaceController {
  constructor(private readonly userService: PlaceService) {}

  @MessagePattern('get-hello')
  getHello(): any {
    return this.userService.createPlace('address');
  }

  @MessagePattern('place-created')
  createPlace(address: string): any {
    return this.userService.createPlace(address);
  }

  @MessagePattern('search-place')
  searchPlace(address: string): any {
    return this.userService.searchPlace(address);
  }

}
