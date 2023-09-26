import { IsString, IsNumber } from 'class-validator';

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
