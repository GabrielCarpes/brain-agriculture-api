import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmService } from './create-farm.service';
import { CreateFarmUseCase } from '../useCases/create-farm-usecase';
import { InvalidFarmAreaSumError } from '../errors/invalid-farm-area-sum-error';
import { CreateFarmUnexpectedError } from '../errors/create-farm-unexpected-error';
import { IFarm } from '../../domain/interfaces/farm.interface';

let createFarmService: CreateFarmService;

let spyCreateFarmUseCaseExecute: jest.SpyInstance<Promise<void>, [payload: IFarm]>;

describe('CreateFarmService', () => {
  beforeEach(async () => {
    const createFarmUseCaseMock = {
      provide: CreateFarmUseCase,
      useValue: {
        execute: jest.fn(() => Promise.resolve()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmService, createFarmUseCaseMock],
    }).compile();

    const createFarmUseCase = module.get<CreateFarmUseCase>(CreateFarmUseCase);

    createFarmService = new CreateFarmService(createFarmUseCase);

    spyCreateFarmUseCaseExecute = jest.spyOn(createFarmUseCase, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a farm successfully', async () => {
    const props: IFarm = {
      name: 'Fazenda Teste',
      city: 'Cidade Exemplo',
      state: 'EX',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      producerId: '123e4567-e89b-12d3-a456-426614174000',
    };

    await expect(createFarmService.execute(props)).resolves.toBeUndefined();

    expect(spyCreateFarmUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(spyCreateFarmUseCaseExecute).toHaveBeenCalledWith(props);
  });

  it('should throw InvalidFarmAreaSumError if arableArea + vegetationArea > totalArea', async () => {
    const props: IFarm = {
      name: 'Fazenda Inválida',
      city: 'Cidade Erro',
      state: 'ER',
      totalArea: 100,
      arableArea: 70,
      vegetationArea: 50, // 70 + 50 > 100
      producerId: '123e4567-e89b-12d3-a456-426614174000',
    };

    await expect(createFarmService.execute(props)).rejects.toThrow(
      InvalidFarmAreaSumError,
    );
  });

  it('should throw CreateFarmUnexpectedError if use case throws an error', async () => {
    spyCreateFarmUseCaseExecute.mockImplementationOnce(() => {
      throw new CreateFarmUnexpectedError();
    });

    const props: IFarm = {
      name: 'Fazenda Erro',
      city: 'ErroCity',
      state: 'EC',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      producerId: '123e4567-e89b-12d3-a456-426614174000',
    };

    await expect(createFarmService.execute(props)).rejects.toThrow(CreateFarmUnexpectedError);
  });
});
