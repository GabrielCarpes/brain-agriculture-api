import { PrismaClient } from '@prisma/client';
import { ProducerRepository } from '@modules/producers/domain/repositories/producer.repository';
import { Producer } from '@modules/producers/domain/entities/producer';
import { ProducerPrismaMapper } from '@modules/producers/infra/database/prisma/mappers/producer-prisma.mapper';

export class PackageProducerPrismaRepository implements ProducerRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(entity: Producer): Promise<void> {
    const raw = ProducerPrismaMapper.toPrisma(entity);

    const rawProducer = await this.prismaService.producer.create({
      data: raw,
    });

    ProducerPrismaMapper.toDomain(rawProducer);
  }

  async findByDocument(document: string): Promise<Producer | null> {
    const raw = await this.prismaService.producer.findUnique({
      where: { document },
    });

    if (!raw) return null;

    return ProducerPrismaMapper.toDomain(raw);
  }

  async findAll(): Promise<Producer[]> {
    const rawList = await this.prismaService.producer.findMany({
      include: {
        farms: {
          include: {
            crops: true,
          },
        },
      },
    });
  
    return rawList.map(ProducerPrismaMapper.toDomain);
  }

  async update(id: string, data: Partial<Producer>): Promise<void> {
    const raw = ProducerPrismaMapper.toPrisma(data as Producer);

    await this.prismaService.producer.update({
      where: { id },
      data: raw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.producer.delete({
      where: { id },
    });
  }
}
