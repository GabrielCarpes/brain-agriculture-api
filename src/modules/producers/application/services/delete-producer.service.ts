import { Injectable } from '@nestjs/common';
import { DeleteProducerUseCase } from '../useCases/delete-producer-usecase';
import { DeleteProducerUnexpectedError } from '../errors/delete-producer-unexpected-error';

@Injectable()
export class DeleteProducerService {
  constructor(private readonly deleteProducerUseCase: DeleteProducerUseCase) {}

  async execute(document: string): Promise<void> {
    try {
      await this.deleteProducerUseCase.execute(document);
    } catch (error) {
      throw new DeleteProducerUnexpectedError();
    }
  }
}
