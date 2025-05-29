import { Injectable } from '@nestjs/common';
import { CreateFarmUnexpectedError } from '../errors/create-farm-unexpected-error';
import { InvalidFarmAreaSumError } from '../errors/invalid-farm-area-sum-error';
import { IFarm } from '../domain/interfaces/farm.interface';
import { CreateFarmUseCase } from '../useCases/create-farm-usecase';
import { validateFarmAreas } from '@shared/validators/validate-farms-area';

@Injectable()
export class CreateFarmService {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) {}

  async execute(payload: IFarm): Promise<void> {
    try {
      if (
        validateFarmAreas(
          payload.totalArea,
          payload.arableArea,
          payload.vegetationArea,
        )
      ) {
        throw new InvalidFarmAreaSumError();
      }

      await this.createFarmUseCase.execute({ ...payload });
    } catch (error) {
      throw new CreateFarmUnexpectedError();
    }
  }
}
