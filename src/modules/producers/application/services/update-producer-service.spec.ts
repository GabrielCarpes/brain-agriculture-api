import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProducerService } from './update-producer.service';
import { UpdateProducerUseCase } from '../useCases/update-producer-usecase';
import { UpdateProducerUnexpectedError } from '../errors/update-producer-unexpected-error';
import { UpdateProducerDTO } from '../../infra/http/dtos/update-producer.dto';

let updateProducerService: UpdateProducerService;
let spyUpdateProducerUseCaseExecute: jest.SpyInstance<Promise<void>, [string, UpdateProducerDTO]>;

describe('UpdateProducerService', () => {
  beforeEach(async () => {
    const updateProducerUseCaseMocked = {
      provide: UpdateProducerUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProducerService, updateProducerUseCaseMocked],
    }).compile();

    updateProducerService = module.get(UpdateProducerService);
    const updateProducerUseCase = module.get(UpdateProducerUseCase);

    spyUpdateProducerUseCaseExecute = jest.spyOn(
      updateProducerUseCase,
      'execute',
    );
  });

  afterEach(() => jest.clearAllMocks());

  it('should update a producer successfully', async () => {
    const document = '12345678901';
    const updateDto: UpdateProducerDTO = { name: 'Updated Name' };

    await expect(
      updateProducerService.execute(document, updateDto),
    ).resolves.toBeUndefined();

    expect(spyUpdateProducerUseCaseExecute).toHaveBeenCalledWith(
      document,
      updateDto,
    );
  });

  it('should throw UpdateProducerUnexpectedError if use case throws unexpected error', async () => {
    spyUpdateProducerUseCaseExecute.mockImplementationOnce(() => {
      throw new UpdateProducerUnexpectedError();
    });

    const document = '12345678901';
    const updateDto: UpdateProducerDTO = { name: 'Errored Name' };

    await expect(
      updateProducerService.execute(document, updateDto),
    ).rejects.toThrow(UpdateProducerUnexpectedError);
  });
});