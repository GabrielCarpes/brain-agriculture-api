import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvalidFarmFieldsException } from '../dtos/invalid-fields-exception.dto';
import { CreateFarmService } from '@modules/farms/application/services/create-farm.service';
import { CreateFarmDTO } from '../dtos/create-farm.dto';

@ApiTags('Fazendas')
@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmService: CreateFarmService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova fazenda' })
  @ApiResponse({ status: 201, description: 'Fazenda criada com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
    type: InvalidFarmFieldsException,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    {
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
    }: CreateFarmDTO,
  ): Promise<void> {
    await this.createFarmService.execute({
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
    });
  }
}
