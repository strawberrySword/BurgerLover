import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(): any {
    return { userName: 'john', password: '1234' };
  }
}
