import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/user.entity';
import { UserInfoDto } from 'src/dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @Inject('PLACES_SERVICE') private readonly placesServiceClient: ClientProxy,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  saltRounds = 10;

  async getHello(): Promise<{ username: string; password: string }> {
    return await firstValueFrom(
      this.placesServiceClient.send({ cmd: 'getHello' }, {}),
    );
  }

  async createUser(user: UserInfoDto): Promise<any> {
    const userToCreate = new User();
    userToCreate.userName = user.userName;
    userToCreate.password = await bcrypt.hash(user.password, this.saltRounds);
    userToCreate.avatar = user.avatar;
    try {
      const user = await this.userRepository.save(userToCreate);
      const { password, ...response } = user;

      return {
        status: HttpStatus.CREATED,
        message: 'user_created_succesfully',
        user: response,
      };
    } catch (error) {
      switch (error.code) {
        case '23505':
          return {
            status: HttpStatus.CONFLICT,
            message: 'user_already_exists',
          };
        case '23502':
          return {
            status: HttpStatus.BAD_REQUEST,
            message: 'user_creation_failed',
          };
        default:
          return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'user_creation_failed',
          };
      }
    }
  }

  async searchUserByCredentials(user: UserInfoDto): Promise<any> {
    const userInDb = await this.userRepository.findOne({
      where: {
        userName: user.userName,
      },
    });

    log(userInDb);

    if (!userInDb) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }

    if (!(await bcrypt.compare(user.password, userInDb.password))) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }

    console.log(userInDb);
    const { password, ...response } = userInDb;

    return {
      status: HttpStatus.OK,
      message: 'user_found',
      user: response,
    };
  }
}
