import { FarmPrismaMapper } from '@modules/farms/infra/database/prisma/mappers/farm-prisma.mapper';
import { CropPrismaMapper } from '@modules/crops/infra/database/prisma/mappers/crop-prisma.mapper';

import { Producer } from '@modules/producers/domain/entities/producer';
import type {
  Producer as RawProducer,
  Farm as RawFarm,
  Crop as RawCrop,
} from '@prisma/client';

export type RawProducerWithRelations = RawProducer & {
  farms?: (RawFarm & {
    crops?: RawCrop[];
  })[];
};

export class ProducerPrismaMapper {
  static toPrisma(producer: Producer): RawProducer {
    return {
      id: producer.id,
      document: producer.document,
      name: producer.name,
    };
  }

  static toDomain(raw: RawProducerWithRelations): Producer {
    const farms = raw.farms?.map((farm) => {
      const crops = farm.crops?.map(CropPrismaMapper.toDomain) || [];
      return FarmPrismaMapper.toDomain({ ...farm, crops });
    }) || [];

    return new Producer({
      id: raw.id,
      name: raw.name,
      document: raw.document,
      farms,
    });
  }
}
