import {
  Controller,
  Get,
  Post,
  Inject,
  Body,
  Param,
  HttpException,
  Res,
  Req,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { TokenInfoDto, UserInfoDto } from './dto/user.dto';
import { LocationDto } from './dto/location.dto';
import { Response, Request } from 'express';
import { request } from 'http';

@Controller()
export class GatewayController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('PLACES_SERVICE') private readonly placesServiceClient: ClientProxy,
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
  ) {}

  @Get('/users')
  async getHello(): Promise<{ username: string; password: string }> {
    const userResponse: { username: string; password: string } =
      await firstValueFrom(this.userServiceClient.send('getHello', {}));
    return userResponse;
  }

  @Post('/user')
  async createUser(
    @Body() user: UserInfoDto,
  ): Promise<{ username: string; password: string }> {
    const userDetails = await firstValueFrom(
      this.userServiceClient.send('user-created', user),
    );
    if (userDetails.status !== 201 && userDetails.status !== 200) {
      throw new HttpException(userDetails, userDetails.status);
    }

    const token = await firstValueFrom(
      this.tokenServiceClient.send('generate-token', {
        userName: userDetails.user.userName,
        userId: userDetails.user.id,
      }),
    );

    return { ...userDetails, access_token: token.access_token };
  }

  @Post('/login')
  async login(
    @Body() user: UserInfoDto,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const userDetails = await firstValueFrom(
      this.userServiceClient.send('search-user-credentials', user),
    );
    if (!userDetails || userDetails.status !== 200) {
      throw new HttpException(userDetails, userDetails.status);
    }
    console.log(request.cookies);
    const token = await firstValueFrom(
      this.tokenServiceClient.send('generate-token', {
        userName: userDetails.user.userName,
        userId: userDetails.user.id,
      }),
    );

    if (token.status !== 201) {
      throw new HttpException(token, token.status);
    }
    const tokenExpiresDate = new Date();
    tokenExpiresDate.setDate(tokenExpiresDate.getDate() + 30);
    response.cookie('access_token', token.access_token, {
      secure: true,
      maxAge: 300000,
    });
    return { ...userDetails };
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
