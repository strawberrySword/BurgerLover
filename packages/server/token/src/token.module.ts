import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'this is temporary',
      signOptions: {
        expiresIn: '30d',
      },
    }),
  ],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
