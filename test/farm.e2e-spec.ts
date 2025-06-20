import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('FarmController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/farms (POST) - deve criar uma fazenda com sucesso', async () => {
    const producerRes = await request(app.getHttpServer())
      .post('/producers')
      .send({ name: 'Fazendeiro Teste', document: '12345678900' })
      .expect(201);
  
    const farmPayload = {
      name: 'Fazenda Boa Vista',
      city: 'Cascavel',
      state: 'PR',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 30,
      producerId: producerRes.body.id,
    };
  
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send(farmPayload)
      .expect(201);
  
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: farmPayload.name,
      city: farmPayload.city,
      state: farmPayload.state,
      totalArea: farmPayload.totalArea,
      arableArea: farmPayload.arableArea,
      vegetationArea: farmPayload.vegetationArea,
      producerId: farmPayload.producerId,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  
    expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
  });
  

  it('/farms (POST) - deve falhar ao enviar dados inválidos', async () => {
    const response = await request(app.getHttpServer())
      .post('/farms')
      .send({
        name: '',
        city: 'Cascavel',
        state: 'PR',
        totalArea: -100,
        arableArea: 50,
        vegetationArea: 30,
        producerId: '',
      })
      .expect(400);
  
    expect(response.body).toHaveProperty('message');
    expect(Array.isArray(response.body.message)).toBe(true);
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        expect.stringContaining('name'),
        expect.stringContaining('totalArea'),
        expect.stringContaining('producerId'),
      ])
    );
  });
  
});
