import { Controller } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'getHello' })
  getHello(): Promise<{ username: string; password: string }> {
    return this.userService.getHello();
  }
}
