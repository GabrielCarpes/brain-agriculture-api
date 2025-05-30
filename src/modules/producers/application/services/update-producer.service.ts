import { Injectable } from '@nestjs/common';
import { UpdateProducerUseCase } from '../useCases/update-producer-usecase';
import { UpdateProducerDTO } from '../../infra/http/dtos/update-producer.dto';

@Injectable()
export class UpdateProducerService {
  constructor(private readonly updateProducerUseCase: UpdateProducerUseCase) {}

  async execute(document: string, updateData: UpdateProducerDTO): Promise<void> {
    await this.updateProducerUseCase.execute(document, updateData);
  }
}
