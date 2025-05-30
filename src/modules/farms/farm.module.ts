import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { FarmController } from './infra/http/controllers/farm.controller';
import { CreateFarmService } from './application/services/create-farm.service';
import { CreateFarmUseCase } from './application/useCases/create-farm-usecase';
import { PrismaFarmRepository } from './domain/repositories/prisma/prisma-farm.repository';
import { DatabaseModule } from '@shared/database/database.module';
import { FarmRepository } from './domain/repositories/farm.repository';

@Module({
  controllers: [FarmController],
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [
    CreateFarmService,
    CreateFarmUseCase,
    {
      provide: FarmRepository,
      useClass: PrismaFarmRepository,
    },
  ],
  exports: [CreateFarmService],
})
export class FarmModule {}
