import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  getHello(): string {
    return 'Hello World!';
  }
  processEvent(): string {
    console.log('New event received!');
    return 'OK';
  }
}
