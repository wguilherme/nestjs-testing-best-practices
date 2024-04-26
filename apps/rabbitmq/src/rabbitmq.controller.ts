import { Controller, Get } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern('output')
  receive(): string {
    const response = this.rabbitmqService.processEvent();
    return response;
  }

  @Get()
  healthCheck(): string {
    return 'OK';
  }
}
