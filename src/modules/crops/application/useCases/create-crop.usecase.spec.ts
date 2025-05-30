import { Test, TestingModule } from '@nestjs/testing';
import { CreateCropUseCase } from './create-crop-usecase';
import { CropRepository } from '../../domain/repositories/crop.repository';
import { Crop } from '../../domain/entities/crops';
import { cropMock } from '../../../../../test/factories/crop.mock';
import { CreateCropUnexpectedError } from '../errors/create-crop-unexpected-error';
import { ICrop } from '../../domain/interfaces/crop.interface';

let cropRepository: CropRepository;
let createCropUseCase: CreateCropUseCase;
let spyCropRepositoryCreate: jest.SpyInstance<Promise<void>, [crop: Crop]>;

describe('CreateCropUseCase', () => {
  beforeEach(async () => {
    const cropRepositoryMocked = {
      provide: CropRepository,
      useValue: {
        create: jest.fn(() => Promise.resolve()),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCropUseCase, cropRepositoryMocked],
    }).compile();

    cropRepository = module.get<CropRepository>(CropRepository);
    createCropUseCase = new CreateCropUseCase(cropRepository);
    spyCropRepositoryCreate = jest.spyOn(cropRepository, 'create');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a crop successfully', async () => {
    const crop = cropMock();

    await expect(createCropUseCase.execute(crop)).resolves.toBeUndefined();

    expect(spyCropRepositoryCreate).toHaveBeenCalledTimes(1);
    expect(spyCropRepositoryCreate).toHaveBeenCalledWith(expect.any(Crop));
  });

  it('should throw if repository create throws', async () => {
    spyCropRepositoryCreate.mockImplementationOnce(() => {
      throw new Error('Unexpected');
    });

    const crop = cropMock();

    await expect(createCropUseCase.execute(crop)).rejects.toThrow(Error);
  });

  it('should throw CreateCropUnexpectedError if use case throws unexpected error', async () => {
    spyCropRepositoryCreate.mockImplementationOnce(() => {
      throw new CreateCropUnexpectedError();
    });

    const payload = cropMock();

    await expect(createCropUseCase.execute(payload)).rejects.toThrow(CreateCropUnexpectedError);
    expect(spyCropRepositoryCreate).toHaveBeenCalledTimes(1);
  });
});
