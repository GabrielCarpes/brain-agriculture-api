import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../domain/repositories/producer.repository';

@Injectable()
export class GetAllProducersUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute() {
    return this.producerRepository.findAll();
  }
}
