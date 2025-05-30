import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerUseCase } from './create-producer-usecase';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { Producer } from '../../domain/entities/producer';
import { CreateProducerUnexpectedError } from '../errors/create-producer-unexpected-error';
import { producerMock } from '../../../../../test/factories/producer.mock';

const mockProducer = producerMock({})

describe('CreateProducerUseCase', () => {
  let createProducerUseCase: CreateProducerUseCase;
  let spyProducerRepositoryCreate: jest.SpyInstance<
    Promise<void>,
    [producer: Producer]
  >;

  beforeEach(async () => {
    const producerRepositoryMock = {
      provide: ProducerRepository,
      useValue: {
        create: jest.fn().mockResolvedValue(mockProducer),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProducerUseCase, producerRepositoryMock],
    }).compile();

    createProducerUseCase = module.get<CreateProducerUseCase>(CreateProducerUseCase);

    const repository = module.get<ProducerRepository>(ProducerRepository);
    spyProducerRepositoryCreate = jest.spyOn(repository, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a producer successfully', async () => {
    const props = {
      name: 'John Doe',
      document: '12345678901',
    };

    await expect(createProducerUseCase.execute(props)).resolves.toBeUndefined();

    expect(spyProducerRepositoryCreate).toHaveBeenCalledTimes(1);
    expect(spyProducerRepositoryCreate).toHaveBeenCalledWith(
      expect.objectContaining({ name: props.name, document: props.document })
    );
  });

  it('should throw CreateProducerUnexpectedError if repository throws an error', async () => {
    spyProducerRepositoryCreate.mockImplementationOnce(() => {
      throw new Error('Unexpected DB error');
    });

    const props = {
      name: 'Jane Doe',
      document: '98765432100',
    };

    await expect(createProducerUseCase.execute(props)).rejects.toThrow(
      CreateProducerUnexpectedError,
    );
  });
});
