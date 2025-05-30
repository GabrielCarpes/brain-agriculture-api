import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../domain/repositories/producer.repository';

@Injectable()
export class GetProducerByDocumentUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(document: string) {
    return this.producerRepository.findByDocument(document);
  }
}
