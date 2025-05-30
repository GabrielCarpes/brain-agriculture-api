import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { ProducerController } from './infra/http/controllers/producer.controller';

import { DatabaseModule } from '@shared/database/database.module';

import { ProducerRepository } from './domain/repositories/producer.repository';
import { PrismaProducerRepository } from './domain/repositories/prisma/prisma-producer.repository';

import { CreateProducerUseCase } from './application/useCases/create-producer-usecase';
import { DeleteProducerUseCase } from './application/useCases/delete-producer-usecase';
import { UpdateProducerUseCase } from './application/useCases/update-producer-usecase';
import { GetAllProducersUseCase } from './application/useCases/get-all-producer-usecase';

import { CreateProducerService } from './application/services/create-producer.service';
import { DeleteProducerService } from './application/services/delete-producer.service';
import { UpdateProducerService } from './application/services/update-producer.service';
import { GetAllProducersService } from './application/services/get-all-producer.service';
import { GetProducerByDocumentUseCase } from './application/useCases/get-by-document-producer-usecase';

@Module({
  controllers: [ProducerController],
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [
    // Services
    CreateProducerService,
    DeleteProducerService,
    UpdateProducerService,
    GetAllProducersService,
    GetProducerByDocumentUseCase,

    // UseCases
    CreateProducerUseCase,
    DeleteProducerUseCase,
    UpdateProducerUseCase,
    GetAllProducersUseCase,
    GetProducerByDocumentUseCase,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
  ],
  exports: [
    CreateProducerService,
    DeleteProducerService,
    UpdateProducerService,
    GetAllProducersService,
  ],
})
export class ProducerModule {}
