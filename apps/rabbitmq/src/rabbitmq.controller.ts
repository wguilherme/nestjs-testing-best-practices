import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern()
  receive(@Ctx() context: RmqContext): string {
    console.log(context);
    const response = this.rabbitmqService.processEvent();
    return response;
  }

  @Get()
  healthCheck(): string {
    return 'OK';
  }
}
