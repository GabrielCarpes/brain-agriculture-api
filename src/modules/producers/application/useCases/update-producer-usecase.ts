import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../domain/repositories/producer.repository';
import { UpdateProducerDTO } from '../../infra/http/dtos/update-producer.dto';
import { UpdateProducerUnexpectedError } from '../errors/update-producer-unexpected-error';

@Injectable()
export class UpdateProducerUseCase {
  constructor(private readonly producerRepository: ProducerRepository) {}

  async execute(document: string, updateData: UpdateProducerDTO): Promise<void> {
    try {
      await this.producerRepository.update(document, updateData);
    } catch (error) {
      throw new UpdateProducerUnexpectedError();
    }
  }
}
