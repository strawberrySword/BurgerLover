import { Injectable } from '@nestjs/common';

@Injectable()
export class PlacesService {
  getHello(): string {
    return 'Hello World!';
  }
}
