import { Injectable } from '@nestjs/common';
import { Crop } from '../../domain/entities/crops';
import { CropRepository } from '../../domain/repositories/crop.repository';

@Injectable()
export class CreateCropUseCase {
  constructor(private readonly cropRepository: CropRepository) {}

  async execute(crop: Crop): Promise<void> {
    await this.cropRepository.create(crop);
  }
}