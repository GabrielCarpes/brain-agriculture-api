import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerService } from './create-producer.service';
import { CreateProducerUseCase } from '../useCases/create-producer-usecase';
import { GetProducerByDocumentUseCase } from '../useCases/get-by-document-producer-usecase';
import { InvalidDocumentFormatError } from '../errors/invalid-document-format-error';
import { ProducerAlreadyExistsError } from '../errors/producer-already-exists-error';
import { CreateProducerUnexpectedError } from '../errors/create-producer-unexpected-error';
import { IProducer } from '../../domain/interfaces/producer.interface';

describe('CreateProducerService', () => {
  let createProducerService: CreateProducerService;

  let spyCreateProducerUseCaseExecute: jest.SpyInstance;
  let spyGetProducerByDocumentUseCaseExecute: jest.SpyInstance;

  beforeEach(async () => {
    const createProducerUseCaseMock = {
      provide: CreateProducerUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const getProducerByDocumentUseCaseMock = {
      provide: GetProducerByDocumentUseCase,
      useValue: {
        execute: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerService,
        createProducerUseCaseMock,
        getProducerByDocumentUseCaseMock,
      ],
    }).compile();

    const createProducerUseCase = module.get<CreateProducerUseCase>(
      CreateProducerUseCase,
    );

    const getProducerByDocumentUseCase =
      module.get<GetProducerByDocumentUseCase>(GetProducerByDocumentUseCase);

    createProducerService = new CreateProducerService(
      createProducerUseCase,
      getProducerByDocumentUseCase,
    );

    spyCreateProducerUseCaseExecute = jest.spyOn(
      createProducerUseCase,
      'execute',
    );

    spyGetProducerByDocumentUseCaseExecute = jest.spyOn(
      getProducerByDocumentUseCase,
      'execute',
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a producer successfully', async () => {
    spyGetProducerByDocumentUseCaseExecute.mockResolvedValue(null);

    const props: IProducer = {
      name: 'John Doe',
      document: '12345678901',
    };

    await expect(createProducerService.execute(props)).resolves.toBeUndefined();

    expect(spyGetProducerByDocumentUseCaseExecute).toHaveBeenCalledWith(
      props.document,
    );
    expect(spyCreateProducerUseCaseExecute).toHaveBeenCalledWith(props);
  });

  it('should throw InvalidDocumentFormatError if document is malformed', async () => {
    const props: IProducer = {
      name: 'Invalid Format',
      document: 'invalid_doc',
    };

    await expect(createProducerService.execute(props)).rejects.toThrow(
      InvalidDocumentFormatError,
    );

    expect(spyGetProducerByDocumentUseCaseExecute).not.toHaveBeenCalled();
    expect(spyCreateProducerUseCaseExecute).not.toHaveBeenCalled();
  });

  it('should throw ProducerAlreadyExistsError if document already exists', async () => {
    spyGetProducerByDocumentUseCaseExecute.mockResolvedValue({});

    const props: IProducer = {
      name: 'Existing Producer',
      document: '12345678901',
    };

    await expect(createProducerService.execute(props)).rejects.toThrow(
      ProducerAlreadyExistsError,
    );

    expect(spyCreateProducerUseCaseExecute).not.toHaveBeenCalled();
  });

  it('should throw CreateProducerUnexpectedError on unexpected exception', async () => {
    spyGetProducerByDocumentUseCaseExecute.mockResolvedValue(null);
    spyCreateProducerUseCaseExecute.mockImplementation(() => {
      throw new Error('Unexpected');
    });

    const props: IProducer = {
      name: 'Unexpected Error',
      document: '12345678901',
    };

    await expect(createProducerService.execute(props)).rejects.toThrow(
      CreateProducerUnexpectedError,
    );
  });
});
