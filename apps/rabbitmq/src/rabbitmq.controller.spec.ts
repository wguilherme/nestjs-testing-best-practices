import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';

import { RabbitmqModule } from './rabbitmq.module';

describe('RabbitMQService Controller (e2e)', () => {
  it('Should receive a heartbat message', async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RabbitmqModule,
        ClientsModule.register([{ name: 'output', transport: Transport.RMQ }]),
      ],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    app.connectMicroservice({ transport: Transport.RMQ });

    await app.startAllMicroservices();
    app.init();

    const client: ClientProxy = app.get<ClientProxy>('output');
    await client.connect();

    const payload = { data: 'output' };

    const response = await client.send('output', payload).toPromise();

    expect(response).toEqual('New event received');

    await app.close();
    client.close();
  });
});
