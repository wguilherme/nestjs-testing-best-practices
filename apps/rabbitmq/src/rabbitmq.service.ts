import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  processEvent(): string {
    const response = 'New event received';
    return response;
  }
}
