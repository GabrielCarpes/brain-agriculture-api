import { CropPrismaMapper } from '@modules/crops/infra/database/prisma/mappers/crop-prisma.mapper';
import { Farm } from '@modules/farms/domain/entities/farm';
import type {
  Farm as RawFarm,
  Crop as RawCrop,
  Producer as RawProducer,
} from '@prisma/client';


export type RawFarmWithRelations = RawFarm & {
  crops?: RawCrop[];
  producer?: RawProducer;
};

export class FarmPrismaMapper {
  static toPrisma(farm: Farm): RawFarm {
    return {
      id: farm.id,
      name: farm.name,
      city: farm.city,
      state: farm.state,
      totalArea: farm.totalArea,
      arableArea: farm.arableArea,
      vegetationArea: farm.vegetationArea,
      producerId: farm.producerId,
    };
  }

  static toDomain(raw: RawFarmWithRelations): Farm {
    return new Farm({
      id: raw.id,
      name: raw.name,
      city: raw.city,
      state: raw.state,
      totalArea: raw.totalArea,
      arableArea: raw.arableArea,
      vegetationArea: raw.vegetationArea,
      producerId: raw.producerId,
      crops: raw.crops?.map(CropPrismaMapper.toDomain) ?? [],
    });
  }
}
