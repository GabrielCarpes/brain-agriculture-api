import { Crop } from "@modules/crops/application/domain/entities/crops";
import { CropRepository } from "@modules/crops/application/domain/repositories/crop.repository";
import { CropPrismaMapper } from "@modules/crops/infra/database/prisma/mappers/crop-prisma.mapper";
import { PrismaClient } from "@prisma/client";

export class PackageCropPrismaRepository implements CropRepository {
  constructor(private readonly prismaService: PrismaClient) {}

  async create(entity: Crop): Promise<void> {
    const raw = CropPrismaMapper.toPrisma(entity);

    const rawCrop = await this.prismaService.crop.create({
      data: raw,
    });

    CropPrismaMapper.toDomain(rawCrop);
  }
}
