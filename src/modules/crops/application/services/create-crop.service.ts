import { Injectable } from '@nestjs/common';
import { CreateCropUnexpectedError } from '../errors/create-crop-unexpected-error';
import { MissingCultureOrHarvestError } from '../errors/missing-culture-or-harvest-error';
import { CreateCropUseCase } from '../useCases/create-crop-usecase';
import { ICrop } from '../domain/interfaces/crop.interface';
import { Crop } from '../domain/entities/crops';

@Injectable()
export class CreateCropService {
  constructor(private readonly createCropUseCase: CreateCropUseCase) {}

  async execute({ culture, harvest, farmId }: ICrop): Promise<void> {
    if (!culture || !harvest) {
      throw new MissingCultureOrHarvestError();
    }

    try {
      const crop = new Crop({ culture, harvest, farmId });
      await this.createCropUseCase.execute(crop);
    } catch (error) {
      throw new CreateCropUnexpectedError();
    }
  }
}
