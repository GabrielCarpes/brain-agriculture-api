import { DeleteProducerUseCase } from './delete-producer-usecase';
import { DeleteProducerUnexpectedError } from '../errors/delete-producer-unexpected-error';
import { ProducerRepository } from '../../domain/repositories/producer.repository';

let deleteProducerUseCase: DeleteProducerUseCase;
let spyDelete: jest.SpyInstance<Promise<void>, [document: string]>;

describe('DeleteProducerUseCase', () => {
  beforeEach(() => {
    const producerRepositoryMock: ProducerRepository = {
      delete: jest.fn(),
    } as any;

    deleteProducerUseCase = new DeleteProducerUseCase(producerRepositoryMock);
    spyDelete = jest.spyOn(producerRepositoryMock, 'delete');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete producer successfully', async () => {
    const document = '12345678901';

    await expect(deleteProducerUseCase.execute(document)).resolves.toBeUndefined();
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(spyDelete).toHaveBeenCalledWith(document);
  });

  it('should throw DeleteProducerUnexpectedError if repository throws', async () => {
    const document = '12345678901';
    spyDelete.mockImplementationOnce(() => {
      throw new Error('any error');
    });

    await expect(deleteProducerUseCase.execute(document)).rejects.toThrow(
      DeleteProducerUnexpectedError,
    );
  });
});
