import { Farm } from "@modules/farms/domain/entities/farm";
import { FarmRepository } from "@modules/farms/domain/repositories/farm.repository";
import { FarmPrismaMapper } from "@modules/farms/infra/database/prisma/mappers/farm-prisma.mapper";
import { PrismaClient } from "@prisma/client";

export class PackageFarmPrismaRepository implements FarmRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(entity: Farm): Promise<void> {
    const raw = FarmPrismaMapper.toPrisma(entity);

    const rawFarm = await this.prismaService.farm.create({
      data: raw,
    });

    FarmPrismaMapper.toDomain(rawFarm);
  }
}