import request from 'supertest';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('ProducerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const baseProducer = {
    name: 'João Silva',
    document: '12345678909',
  };

  it('/producers (POST) - should create producer', async () => {
    const response = await request(app.getHttpServer())
      .post('/producers')
      .send(baseProducer);

    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('/producers (GET) - should list producers', async () => {
    const response = await request(app.getHttpServer())
      .get('/producers');

    expect(response.status).toBe(HttpStatus.OK);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/producers/:id (PATCH) - should update producer', async () => {
    const id = baseProducer.document;
    const updatedData = { name: 'João Atualizado' };

    const response = await request(app.getHttpServer())
      .patch(`/producers/${id}`)
      .send(updatedData);

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });

  it('/producers/:id (DELETE) - should delete producer', async () => {
    const id = baseProducer.document;

    const response = await request(app.getHttpServer())
      .delete(`/producers/${id}`);

    expect(response.status).toBe(HttpStatus.NO_CONTENT);
  });
});
