import { Injectable } from '@nestjs/common';
import { GetAllProducersUseCase } from '../useCases/get-all-producer-usecase';
import { GetAllProducersUnexpectedError } from '../errors/get-all-producer-unexpected-error';

@Injectable()
export class GetAllProducersService {
  constructor(
    private readonly getAllUseCase: GetAllProducersUseCase
  ) {}

  async execute() {
    try{  
      return this.getAllUseCase.execute();
    } catch (error) {
      console.log(error)
      throw new GetAllProducersUnexpectedError();
    }
  }
}
