import { Test, TestingModule } from '@nestjs/testing';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { Producer } from '../../domain/entities/producer';
import { producerMock } from '../../../../../test/factories/producer.mock';
import { GetAllProducersUseCase } from './get-all-producer-usecase';

describe('GetAllProducersUseCase', () => {
  let getAllProducersUseCase: GetAllProducersUseCase;
  let spyFindAll: jest.SpyInstance<Promise<Producer[]>, []>;

  const mockProducers = [producerMock({}), producerMock({ name: 'Jane Doe' })];

  beforeEach(async () => {
    const producerRepositoryMock = {
      provide: ProducerRepository,
      useValue: {
        findAll: jest.fn(() => Promise.resolve(mockProducers)),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllProducersUseCase, producerRepositoryMock],
    }).compile();

    getAllProducersUseCase = module.get<GetAllProducersUseCase>(GetAllProducersUseCase);
    const producerRepository = module.get<ProducerRepository>(ProducerRepository);
    spyFindAll = jest.spyOn(producerRepository, 'findAll');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of producers', async () => {
    const result = await getAllProducersUseCase.execute();

    expect(result).toEqual(mockProducers);
    expect(spyFindAll).toHaveBeenCalledTimes(1);
  });
});
