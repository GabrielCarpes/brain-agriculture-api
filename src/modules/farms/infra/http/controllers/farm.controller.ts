import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { CreateFarmService } from '@modules/farms/application/services/create-farm.service';
import { CreateFarmDTO } from '../dtos/create-farm.dto';
import { InvalidFarmFieldsException } from '../dtos/invalid-fields-exception.dto';

@ApiTags('Fazendas')
@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmService: CreateFarmService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar uma nova fazenda',
    description: 'Cria uma fazenda vinculada a um produtor previamente cadastrado. Todos os campos são obrigatórios.',
  })
  @ApiBody({
    type: CreateFarmDTO,
    description: 'Dados necessários para criação da fazenda',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Fazenda criada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos ou campos obrigatórios ausentes.',
    type: InvalidFarmFieldsException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao criar a fazenda.',
  })
  async create(@Body() farmData: CreateFarmDTO): Promise<void> {
    await this.createFarmService.execute(farmData);
  }
}
