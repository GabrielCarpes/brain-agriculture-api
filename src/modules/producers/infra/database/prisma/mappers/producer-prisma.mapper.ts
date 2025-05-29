import { FarmPrismaMapper } from '@modules/farms/infra/database/prisma/mappers/farm-prisma.mapper';
import { Producer } from '@modules/producers/application/domain/entities/producer';
import type { Producer as RawProducer, Farm as RawFarm } from '@prisma/client';

export type RawProducerWithRelations = RawProducer & {
  farms?: RawFarm[];
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
    console.log(raw)
    return new Producer({
      id: raw.id,
      name: raw.name,
      document: raw.document,
      farms: raw.farms?.length ? raw.farms?.map(FarmPrismaMapper.toDomain) : [],
    });
  }
}
