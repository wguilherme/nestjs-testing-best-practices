import { INestApplication } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  Ctx,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqService } from './rabbitmq.service';
import { GenericContainer } from 'testcontainers';

describe('RabbitMQService Controller (e2e)', () => {
  it('Should receive a heartbat message', async () => {
    //

    const rabbitmq = await new GenericContainer('rabbitmq:3-management')
      .withExposedPorts({ container: 5672, host: 5672 })
      .withExposedPorts({ container: 15672, host: 15672 })
      .start();

    const pattern = randomUUID();

    class RabbitmqControllerMock extends RabbitmqController {
      @MessagePattern(pattern)
      receive(@Ctx() context): string {
        return super.receive(context);
      }
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([{ name: 'output', transport: Transport.RMQ }]),
      ],
      controllers: [RabbitmqControllerMock],
      providers: [RabbitmqService],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    app.connectMicroservice({ transport: Transport.RMQ });

    await app.startAllMicroservices();
    app.init();

    const client: ClientProxy = app.get<ClientProxy>('output');
    await client.connect();

    // const controller = app.get(RabbitmqController);

    // console.log(controller);

    const payload = { data: 'output' };

    const response = await client.send(pattern, payload).toPromise();

    expect(response).toEqual('New event received');

    await app.close();
    client.close();
    await rabbitmq.stop();
  }, 5000000);
});
