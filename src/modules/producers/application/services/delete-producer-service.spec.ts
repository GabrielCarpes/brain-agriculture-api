import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProducerService } from './delete-producer.service';
import { DeleteProducerUseCase } from '../useCases/delete-producer-usecase';
import { DeleteProducerUnexpectedError } from '../errors/delete-producer-unexpected-error';

let deleteProducerService: DeleteProducerService;
let spyDeleteProducerUseCaseExecute: jest.SpyInstance<Promise<void>, [string]>;

describe('DeleteProducerService', () => {
  beforeEach(async () => {
    const deleteProducerUseCaseMocked = {
      provide: DeleteProducerUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProducerService, deleteProducerUseCaseMocked],
    }).compile();

    deleteProducerService = module.get(DeleteProducerService);
    const deleteProducerUseCase = module.get(DeleteProducerUseCase);

    spyDeleteProducerUseCaseExecute = jest.spyOn(
      deleteProducerUseCase,
      'execute',
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should delete a producer successfully', async () => {
    const document = '12345678901';

    await expect(deleteProducerService.execute(document)).resolves.toBeUndefined();
    expect(spyDeleteProducerUseCaseExecute).toHaveBeenCalledWith(document);
  });

  it('should throw DeleteProducerUnexpectedError if use case throws unexpected error', async () => {
    spyDeleteProducerUseCaseExecute.mockImplementationOnce(() => {
      throw new DeleteProducerUnexpectedError();
    });

    await expect(
      deleteProducerService.execute('12345678901'),
    ).rejects.toThrow(DeleteProducerUnexpectedError);
  });
});