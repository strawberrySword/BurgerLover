import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  Param,
  HttpException,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { TokenInfoDto, UserInfoDto } from './dto/user.dto';
import { LocationDto } from './dto/location.dto';
import { Response } from 'express';
import {
  BaseResponse,
  SignUpRequestDto,
  CreateUserResponseDto,
  SearchUserResponseDto,
} from '@burgerlover/core';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('PLACES_SERVICE') private readonly placesServiceClient: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
  ) {}

  @Post('/user')
  async createUser(
    @Body() user: SignUpRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<CreateUserResponseDto | HttpException> {
    const userDetails: CreateUserResponseDto = await firstValueFrom(
      this.userServiceClient.send('user-created', user),
    );
    if (userDetails.status !== HttpStatus.CREATED) {
      console.log('gatcha', userDetails.status);
      throw new HttpException(userDetails, userDetails.status);
    }
    console.log('hu?');

    const token = await firstValueFrom(
      this.tokenServiceClient.send('generate-token', {
        userName: userDetails.userName,
        userId: userDetails.id,
      }),
    );

    if (token.status !== HttpStatus.CREATED) {
      throw new HttpException(token, token.status);
    }
    const tokenExpiresDate = new Date();
    tokenExpiresDate.setDate(tokenExpiresDate.getDate() + 30);
    response.cookie('access_token', token.access_token, {
      secure: true,
      maxAge: 300000,
    });

    return userDetails;
  }

  @Post('/login')
  async login(
    @Body() user: UserInfoDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SearchUserResponseDto | HttpException> {
    const userDetails: SearchUserResponseDto = await firstValueFrom(
      this.userServiceClient.send('search-user-credentials', user),
    );

    if (userDetails.status !== HttpStatus.OK) {
      throw new HttpException(userDetails, userDetails.status);
    }

    const token = await firstValueFrom(
      this.tokenServiceClient.send('generate-token', {
        userName: userDetails.userName,
        userId: userDetails.id,
      }),
    );

    if (token.status !== HttpStatus.CREATED) {
      throw new HttpException(token, token.status);
    }
    const tokenExpiresDate = new Date();
    tokenExpiresDate.setDate(tokenExpiresDate.getDate() + 30);
    response.cookie('access_token', token.access_token, {
      secure: true,
      maxAge: 300000,
    });

    return userDetails;
  }

  @Get('/hello/:address')
  async hello(@Param('address') address: string): Promise<LocationDto> {
    return await firstValueFrom(
      this.placesServiceClient.send('search-place', address),
    );
  }

  @Post('/validate')
  async validate(@Body() { token: token }: TokenInfoDto) {
    console.log(token);

    return await firstValueFrom(
      this.tokenServiceClient.send('validate-token', {
        token: token,
      }),
    );
  }
}
