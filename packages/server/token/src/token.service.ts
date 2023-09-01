import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async createToken(userData: {
    userName: string;
    userId: string;
  }): Promise<{ access_token: string; status: HttpStatus; message: string }> {
    try {
      const payload = { id: userData.userId, username: userData.userName };
      const token = await this.jwtService.signAsync(payload);
      console.log(userData);
      return {
        status: HttpStatus.CREATED,
        access_token: token,
        message: 'token_generated_successfully',
      };
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'failed_generate_token',
        access_token: '',
      };
    }
  }

  async validateToken(token: string): Promise<any> {
    const isValid = await this.jwtService.verifyAsync(token);
    console.log(isValid);
    return 'hey';
  }
}
