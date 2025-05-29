import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from '@shared/application/services/app.service';

import { FarmModule } from './modules/farms/farm.module';
import { CropModule } from './modules/crops/crop.module';
import { ProducerModule } from './modules/producers/producer.module';
import { DatabaseModule } from '@shared/database/database.module';
import { AppController } from '@infra/http/controllers/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ProducerModule,
    FarmModule,
    CropModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
