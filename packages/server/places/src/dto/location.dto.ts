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

export class LocationDto {
  @IsString()
  lat: string;

  @IsString()
  lon: string;

  @IsString()
  type: string;

  @IsNumber()
  importance: number;

  [key: string]: any;
}
