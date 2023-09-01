import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsBoolean,
  IsNumber,
  IsEmail,
  ValidateNested,
  Length,
  IsArray,
} from 'class-validator';

export class UserInfoDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
