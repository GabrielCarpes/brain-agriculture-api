import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateCropUseCase } from './application/useCases/create-crop-usecase';
import { ConfigModule } from '@nestjs/config';
import { CropController } from './infra/http/controllers/crop.controller';
import { DatabaseModule } from '@shared/database/database.module';
import { CropRepository } from './domain/repositories/crop.repository';
import { PrismaCropRepository } from './domain/repositories/prisma/prisma-crop.repository';
import { CreateCropService } from './application/services/create-crop.service';

@Module({
  controllers: [CropController],
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [
    {
      provide: CropRepository,
      useClass: PrismaCropRepository,
    },
    CreateCropUseCase,
    CreateCropService,
  ],
  exports: [CreateCropService],
})
export class CropModule {}
