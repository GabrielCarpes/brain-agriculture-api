import { Test, TestingModule } from '@nestjs/testing';
import { CreateCropService } from './create-crop.service';
import { CreateCropUseCase } from '../useCases/create-crop-usecase';
import { CreateCropUnexpectedError } from '../errors/create-crop-unexpected-error';
import { MissingCultureOrHarvestError } from '../errors/missing-culture-or-harvest-error';
import { ICrop } from '../../domain/interfaces/crop.interface';
import { cropMock } from '../../../../../test/factories/crop.mock';

let createCropService: CreateCropService;
let spyCreateCropUseCaseExecute: jest.SpyInstance<Promise<void>, [crop: any]>;

describe('CreateCropService', () => {
  beforeEach(async () => {
    const createCropUseCaseMocked = {
      provide: CreateCropUseCase,
      useValue: {
        execute: jest.fn(() => Promise.resolve()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCropService, createCropUseCaseMocked],
    }).compile();

    const createCropUseCase = module.get<CreateCropUseCase>(CreateCropUseCase);
    createCropService = new CreateCropService(createCropUseCase);
    spyCreateCropUseCaseExecute = jest.spyOn(createCropUseCase, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a crop successfully', async () => {
    const payload: ICrop = cropMock();

    await expect(createCropService.execute(payload)).resolves.toBeUndefined();
    expect(spyCreateCropUseCaseExecute).toHaveBeenCalledTimes(1);
    expect(spyCreateCropUseCaseExecute).toHaveBeenCalledWith(expect.anything());
  });

  it('should throw MissingCultureOrHarvestError if culture or harvest is missing', async () => {
    const payload: ICrop = {
      culture: '',
      harvest: '',
      farmId: 'fake-farm-id',
    };

    await expect(createCropService.execute(payload)).rejects.toThrow(MissingCultureOrHarvestError);
    expect(spyCreateCropUseCaseExecute).not.toHaveBeenCalled();
  });

  it('should throw CreateCropUnexpectedError if use case throws unexpected error', async () => {
    spyCreateCropUseCaseExecute.mockImplementationOnce(() => {
      throw new CreateCropUnexpectedError();
    });

    const payload: ICrop = cropMock();

    await expect(createCropService.execute(payload)).rejects.toThrow(CreateCropUnexpectedError);
    expect(spyCreateCropUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
