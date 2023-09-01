import { Controller } from '@nestjs/common';
import { TokenService } from './token.service';
import { MessagePattern } from '@nestjs/microservices';
// import { TokenInfoDto } from '@burger/common'

@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern('generate-token')
  async generateToken(userData: { userName: string; userId: string }): Promise<{
    access_token: string;
  }> {
    return await this.tokenService.createToken(userData);
  }

  @MessagePattern('validate-token')
  async validateToken(token: { token: string }): Promise<any> {
    console.log(token);

    return await this.tokenService.validateToken(token.token);
  }
}
