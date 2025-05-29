// src/modules/farms/application/usecases/create-farm.usecase.ts

import { Injectable } from '@nestjs/common';
import { CreateFarmUnexpectedError } from '../errors/create-farm-unexpected-error';
import { IFarm } from '../domain/interfaces/farm.interface';
import { Farm } from '@modules/farms/application/domain/entities/farm';
import { FarmRepository } from '@modules/farms/application/domain/repositories/farm.repository';

@Injectable()
export class CreateFarmUseCase {
  constructor(private readonly farmRepository: FarmRepository) {}

  async execute(farm: IFarm): Promise<void> {
    try {
      const farmEntity = new Farm({
        ...farm
      })
      await this.farmRepository.create(farmEntity);
    } catch (error) {
      throw new CreateFarmUnexpectedError();
    }
  }
}
