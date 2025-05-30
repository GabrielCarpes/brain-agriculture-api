import { Injectable } from '@nestjs/common';
import { PackageFarmPrismaRepository } from '@infra/database/prisma/repository/package-farm-prisma.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class PrismaFarmRepository extends PackageFarmPrismaRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }
}

