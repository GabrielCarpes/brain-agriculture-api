import { Test, TestingModule } from '@nestjs/testing';
import { CreateFarmUseCase } from './create-farm-usecase';
import { FarmRepository } from '../../domain/repositories/farm.repository';
import { CreateFarmUnexpectedError } from '../errors/create-farm-unexpected-error';
import { IFarm } from '../../domain/interfaces/farm.interface';
import { Farm } from '../../domain/entities/farm';
import { farmMock } from '../../../../../test/factories/farm.mock';

const farmMocked = farmMock();

let farmRepository: FarmRepository;
let createFarmUseCase: CreateFarmUseCase;

let spyFarmRepositoryCreate: jest.SpyInstance<Promise<void>, [farm: Farm]>;

describe('CreateFarmUseCase', () => {
  beforeEach(async () => {
    const farmRepositoryMocked = {
      provide: FarmRepository,
      useValue: {
        create: jest.fn(() => Promise.resolve()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateFarmUseCase, farmRepositoryMocked],
    }).compile();

    farmRepository = module.get<FarmRepository>(FarmRepository);
    createFarmUseCase = new CreateFarmUseCase(farmRepository);
    spyFarmRepositoryCreate = jest.spyOn(farmRepository, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a farm successfully', async () => {
    const payload: IFarm = farmMocked;

    await expect(createFarmUseCase.execute(payload)).resolves.toBeUndefined();

    expect(spyFarmRepositoryCreate).toHaveBeenCalledTimes(1);
    expect(spyFarmRepositoryCreate).toHaveBeenCalledWith(expect.any(Farm));
  });

  it('should throw CreateFarmUnexpectedError if repository.create throws error', async () => {
    spyFarmRepositoryCreate.mockImplementationOnce(() => {
      throw new CreateFarmUnexpectedError();
    });

    const payload: IFarm = farmMocked;

    await expect(createFarmUseCase.execute(payload)).rejects.toThrow(CreateFarmUnexpectedError);
    expect(spyFarmRepositoryCreate).toHaveBeenCalledTimes(1);
  });
});
