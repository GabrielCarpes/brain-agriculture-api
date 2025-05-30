import { Test, TestingModule } from '@nestjs/testing';
import { GetProducerByDocumentUseCase } from './get-by-document-producer-usecase';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { Producer } from '../../domain/entities/producer';
import { producerMock } from '../../../../../test/factories/producer.mock';

describe('GetProducerByDocumentUseCase', () => {
  let getProducerByDocumentUseCase: GetProducerByDocumentUseCase;
  let spyFindByDocument: jest.SpyInstance<Promise<Producer | null>, [string]>;

  beforeEach(async () => {
    const producerRepositoryMock = {
      provide: ProducerRepository,
      useValue: {
        findByDocument: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetProducerByDocumentUseCase, producerRepositoryMock],
    }).compile();

    const repository = module.get<ProducerRepository>(ProducerRepository);
    getProducerByDocumentUseCase = module.get<GetProducerByDocumentUseCase>(GetProducerByDocumentUseCase);

    spyFindByDocument = jest.spyOn(repository, 'findByDocument');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a producer when document exists', async () => {
    const mockedProducer = producerMock();
    spyFindByDocument.mockResolvedValueOnce(mockedProducer);

    const result = await getProducerByDocumentUseCase.execute(mockedProducer.document);

    expect(result).toEqual(mockedProducer);
    expect(spyFindByDocument).toHaveBeenCalledTimes(1);
    expect(spyFindByDocument).toHaveBeenCalledWith(mockedProducer.document);
  });

  it('should return null when no producer is found', async () => {
    spyFindByDocument.mockResolvedValueOnce(null);

    const result = await getProducerByDocumentUseCase.execute('00000000000');

    expect(result).toBeNull();
    expect(spyFindByDocument).toHaveBeenCalledTimes(1);
    expect(spyFindByDocument).toHaveBeenCalledWith('00000000000');
  });
});
