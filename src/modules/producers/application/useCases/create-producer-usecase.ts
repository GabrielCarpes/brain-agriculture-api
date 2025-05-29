import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../domain/repositories/producer.repository';
import { IProducer } from '../interfaces/producer.interface';
import { Producer } from '../domain/entities/producer';

@Injectable()
export class CreateProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(producer: IProducer): Promise<void> {
    const producerEntity = new Producer({ name: producer.name, document: producer.document });

    await this.producerRepository.create(producerEntity);
  }
}
