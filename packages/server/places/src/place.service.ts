import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LocationDto } from './dto/location.dto';

@Injectable()
export class PlaceService {
  getHello(): string {
    return 'Hello World!';
  }

  async createPlace(address: string): Promise<any> {
    return {
      status: 201,
      message: 'place_created',
      place: { address: address },
    };
  }

  async searchPlace(address: string): Promise<any> {
    try {
      const res = await axios.get(
        `https://geocode.maps.co/search?q=` + address.replace(' ', '+'),
      );

      const locations: LocationDto[] = res.data;
      const place: LocationDto = this.findBurgerPlace(locations);
      return {
        status: 200,
        message: 'place_found',
        place: { ...place },
      };
    } catch (error) {
      console.log(error);
      return {
        status: 404,
        message: 'place_not_found',
        place: { address: address },
      };
    }
  }

  findBurgerPlace(locations: LocationDto[]): any {
    const MostRelaventRestaurant = locations.filter((location: LocationDto) => {
      return (
        location.type === 'restaurant' &&
        (location.display_name.includes('Israel') ||
          location.display_name.includes('Tel Aviv') ||
          location.display_name.includes('ישראל'))
      );
    });
    return MostRelaventRestaurant;
  }
}
