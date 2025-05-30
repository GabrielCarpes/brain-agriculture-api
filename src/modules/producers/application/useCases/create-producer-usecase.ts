import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { IProducer } from '../../domain/interfaces/producer.interface';
import { Producer } from '../../domain/entities/producer';
import { CreateProducerUnexpectedError } from '../errors/create-producer-unexpected-error';

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(producer: IProducer): Promise<void> {
    try{
      const producerEntity = new Producer({ name: producer.name, document: producer.document });

      await this.producerRepository.create(producerEntity);
    } catch (error) {
      throw new CreateProducerUnexpectedError();
    }
  }
}
