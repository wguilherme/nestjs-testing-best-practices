import { NestFactory } from '@nestjs/core';
import { RabbitmqModule } from './rabbitmq.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(RabbitmqModule);

  app.connectMicroservice({
    name: 'output',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'output',
      queueOptions: {
        durable: true,
        arguments: {
          'x-queue-type': 'quorum',
        },
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
