import { PrismaClient } from '@prisma/client';
import { ProducerPrismaMapper } from '@modules/producers/infra/database/prisma/mappers/producer-prisma.mapper';
import { ProducerRepository } from '@modules/producers/application/domain/repositories/producer.repository';
import { Producer } from '@modules/producers/application/domain/entities/producer';

export class PackageProducerPrismaRepository implements ProducerRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(entity: Producer): Promise<void> {
    const raw = ProducerPrismaMapper.toPrisma(entity);

    const rawProducer = await this.prismaService.producer.create({
      data: raw,
    });

    ProducerPrismaMapper.toDomain(rawProducer);
  }
}
