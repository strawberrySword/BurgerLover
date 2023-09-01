import { Controller } from '@nestjs/common';
import { UserService } from './services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { UserInfoDto } from './dto/user.dto';

//TODO add types
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('getHello')
  getHello(): Promise<{ username: string; password: string }> {
    return this.userService.getHello();
  }

  @MessagePattern('user-created')
  createUser(user: UserInfoDto): any {
    return this.userService.createUser(user);
  }

  @MessagePattern('get-all-users')
  getAllUsers(): any {
    // return this.userService.getUsers();
  }

  @MessagePattern('search-user-id')
  getUserById(id): any {
    //return this.userService.getUserById(id)
  }

  @MessagePattern('search-user-credentials')
  searchUser(user: UserInfoDto): Promise<void> {
    return this.userService.searchUserByCredentials(user);
  }
}
