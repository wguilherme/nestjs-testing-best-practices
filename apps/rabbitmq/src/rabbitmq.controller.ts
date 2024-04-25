import { Controller, Get } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern()
  receive(): void {
    this.rabbitmqService.processEvent();
  }

  @Get()
  getHello(): string {
    return this.rabbitmqService.getHello();
  }
}
