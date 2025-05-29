import { PackageProducerPrismaRepository } from '@infra/database/prisma/repository/package-producer-prisma.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class PrismaProducerRepository extends PackageProducerPrismaRepository {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }
}


