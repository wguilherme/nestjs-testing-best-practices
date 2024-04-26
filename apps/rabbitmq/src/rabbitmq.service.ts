import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitmqService {
  processEvent(): string {
    return 'New event received';
  }
}
