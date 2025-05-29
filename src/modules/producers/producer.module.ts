import { Module } from '@nestjs/common';

import { CreateProducerUseCase } from './application/useCases/create-producer-usecase';
import { ProducerRepository } from './application/domain/repositories/producer.repository';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { ProducerController } from './infra/http/controllers/producer.controller';
import { PrismaProducerRepository } from './application/domain/repositories/prisma/prisma-producer.repository';
import { DatabaseModule } from '@shared/database/database.module';
import { CreateProducerService } from './application/services/create-producer.service';

@Module({
  controllers: [ProducerController],
  imports: [ConfigModule, HttpModule, DatabaseModule],
  providers: [
    CreateProducerService,
    CreateProducerUseCase,
    {
      provide: ProducerRepository,
      useClass: PrismaProducerRepository,
    },
  ],
  exports: [CreateProducerService],
})
export class ProducerModule {}
