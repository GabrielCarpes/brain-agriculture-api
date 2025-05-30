import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

import { CreateCropService } from '@modules/crops/application/services/create-crop.service';
import { CreateCropDTO } from '../dtos/create-crop.dto';
import { CreateCropUnexpectedError } from '@modules/crops/application/errors/create-crop-unexpected-error';

@ApiTags('Culturas')
@ApiBearerAuth()
@Controller('crops')
export class CropController {
  constructor(private readonly createCropService: CreateCropService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Cadastrar uma nova cultura',
    description: 'Cria uma cultura agrícola associada a uma fazenda previamente cadastrada. Todos os campos são obrigatórios.',
  })
  @ApiBody({
    type: CreateCropDTO,
    description: 'Dados da cultura a ser cadastrada.',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Cultura criada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos. Verifique os campos obrigatórios e formatos.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao criar cultura.',
    type: CreateCropUnexpectedError,
  })
  async create(@Body() cropData: CreateCropDTO): Promise<void> {
    await this.createCropService.execute(cropData);
  }
}
