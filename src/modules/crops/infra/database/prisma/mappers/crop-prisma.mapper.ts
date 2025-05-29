import { Crop } from '@modules/crops/application/domain/entities/crops';
import type { Crop as RawCrop, Farm as RawFarm } from '@prisma/client';

export type RawCropWithRelations = RawCrop & {
  farm?: RawFarm;
};

export class CropPrismaMapper {
  static toPrisma(crop: Crop): RawCrop {
    return {
      id: crop.id,
      culture: crop.culture,
      harvest: crop.harvest,
      farmId: crop.farmId,
    };
  }

  static toDomain(raw: RawCropWithRelations): Crop {
    return new Crop({
      id: raw.id,
      culture: raw.culture,
      harvest: raw.harvest,
      farmId: raw.farmId
    });
  }
}
