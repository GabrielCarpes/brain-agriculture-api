import { Injectable } from '@nestjs/common';
import { CreateProducerUnexpectedError } from '../errors/create-producer-unexpected-error';
import { IProducer } from '../interfaces/producer.interface';
import { CreateProducerUseCase } from '../useCases/create-producer-usecase';
import { InvalidDocumentFormatError } from '../errors/invalid-document-format-error';
import { isValidCPFOrCNPJ } from '@shared/validators/document-validator';

@Injectable()
export class CreateProducerService {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  async execute({ name, document }: IProducer): Promise<void> {
      //IMPPLEMENTAR DEPOIS SE EU TIVER SACO
    //   const softwareHouse = await this.getSoftwareHouseByIdUseCase.execute({ id: softwareHouseId })

    // if (!softwareHouse) {
    //   throw new SoftwareHouseNotFoundError();
    // }

    // const storeAlreadyExists =
    //   await this.getStoreByDocumentUseCase.execute({
    //     document: cnpj,
    //   });

    // if (storeAlreadyExists) {
    //   throw new StoreAlreadyExistsError();
    // }

    if (!isValidCPFOrCNPJ(document)) {
      throw new InvalidDocumentFormatError();
    }

    try {
      await this.createProducerUseCase.execute({ name, document });
    } catch (error) {
      throw new CreateProducerUnexpectedError();
    }
  }
}
