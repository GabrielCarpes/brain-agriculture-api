import { PackageCropPrismaRepository } from '@infra/database/prisma/repository/package-crop-prisma.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class PrismaCropRepository extends PackageCropPrismaRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }
}


