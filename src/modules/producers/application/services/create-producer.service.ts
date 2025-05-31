import { Injectable } from '@nestjs/common';
import { CreateProducerUnexpectedError } from '../errors/create-producer-unexpected-error';
import { IProducer } from '../../domain/interfaces/producer.interface';
import { CreateProducerUseCase } from '../useCases/create-producer-usecase';
import { InvalidDocumentFormatError } from '../errors/invalid-document-format-error';
import { isValidCPFOrCNPJ } from '@shared/validators/document-validator';
import { GetProducerByDocumentUseCase } from '../useCases/get-by-document-producer-usecase';
import { ProducerAlreadyExistsError } from '../errors/producer-already-exists-error';

@Injectable()
export class CreateProducerService {
  constructor(
    private readonly createProducerUseCase: CreateProducerUseCase,
    private readonly getProducerByDocumentUseCase: GetProducerByDocumentUseCase
  ) {}

  async execute({ name, document }: IProducer): Promise<void> {
    if (!isValidCPFOrCNPJ(document)) {
      throw new InvalidDocumentFormatError();
    }
    
    const producereAlreadyExists =
      await this.getProducerByDocumentUseCase.execute(document);

    if (producereAlreadyExists) {
      throw new ProducerAlreadyExistsError();
    }

    try {
      await this.createProducerUseCase.execute({ name, document });
    } catch (error) {
      throw new CreateProducerUnexpectedError();
    }
  }
}
