import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { DeleteProducerUnexpectedError } from '../errors/delete-producer-unexpected-error';

@Injectable()
export class DeleteProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(document: string): Promise<void> {
    try {
      await this.producerRepository.delete(document);
    } catch (error) {
      throw new DeleteProducerUnexpectedError();
    }
  }
}
