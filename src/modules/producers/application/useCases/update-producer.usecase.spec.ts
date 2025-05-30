import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProducerUseCase } from './update-producer-usecase';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { UpdateProducerDTO } from '../../infra/http/dtos/update-producer.dto';
import { UpdateProducerUnexpectedError } from '../errors/update-producer-unexpected-error';

describe('UpdateProducerUseCase', () => {
  let updateProducerUseCase: UpdateProducerUseCase;
  let spyUpdate: jest.SpyInstance<Promise<void>, [string, UpdateProducerDTO]>;

  beforeEach(async () => {
    const producerRepositoryMock = {
      provide: ProducerRepository,
      useValue: {
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProducerUseCase, producerRepositoryMock],
    }).compile();

    const repository = module.get<ProducerRepository>(ProducerRepository);
    updateProducerUseCase = module.get<UpdateProducerUseCase>(UpdateProducerUseCase);

    spyUpdate = jest.spyOn(repository, 'update');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update producer successfully', async () => {
    const document = '12345678900';
    const updateData: UpdateProducerDTO = { name: 'Updated Name' };

    await expect(updateProducerUseCase.execute(document, updateData)).resolves.toBeUndefined();

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledWith(document, updateData);
  });

  it('should throw UpdateProducerUnexpectedError if repository throws error', async () => {
    const document = '12345678900';
    const updateData: UpdateProducerDTO = { name: 'Updated Name' };

    spyUpdate.mockRejectedValueOnce(new Error('Unexpected'));

    await expect(updateProducerUseCase.execute(document, updateData)).rejects.toThrow(
      UpdateProducerUnexpectedError,
    );

    expect(spyUpdate).toHaveBeenCalledTimes(1);
  });
});
