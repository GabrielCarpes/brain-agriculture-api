import { Test, TestingModule } from '@nestjs/testing';
import { GetAllProducersService } from './get-all-producer.service';
import { GetAllProducersUseCase } from '../useCases/get-all-producer-usecase';
import { Producer } from '../../domain/entities/producer';
import { GetAllProducersUnexpectedError } from '../errors/get-all-producer-unexpected-error';

let getAllProducersService: GetAllProducersService;
let spyGetAllProducersUseCaseExecute: jest.SpyInstance<Promise<Producer[]>, []>;

describe('GetAllProducersService', () => {
  beforeEach(async () => {
    const getAllProducersUseCaseMocked = {
      provide: GetAllProducersUseCase,
      useValue: {
        execute: jest.fn(() => []),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllProducersService, getAllProducersUseCaseMocked],
    }).compile();

    getAllProducersService = module.get(GetAllProducersService);
    const getAllProducersUseCase = module.get(GetAllProducersUseCase);

    spyGetAllProducersUseCaseExecute = jest.spyOn(
      getAllProducersUseCase,
      'execute',
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should return all producers', async () => {
    const result = await getAllProducersService.execute();

    expect(result).toEqual([]);
    expect(spyGetAllProducersUseCaseExecute).toHaveBeenCalledTimes(1);
  });

  it('should throw GetAllProducersUnexpectedError if use case throws unexpected error', async () => {
    spyGetAllProducersUseCaseExecute.mockImplementationOnce(() => {
      throw new GetAllProducersUnexpectedError();
    });

    await expect(getAllProducersService.execute()).rejects.toThrow(
      GetAllProducersUnexpectedError,
    );
  });
});