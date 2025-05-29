import { CreateCropUnexpectedError } from '@modules/crops/application/errors/create-crop-unexpected-error';
import { CreateCropService } from '@modules/crops/application/services/create-crop.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCropDTO } from '../dtos/create-crop.dto';

@ApiTags('Culturas')
@ApiBearerAuth()
@Controller('v1/crops')
export class CropController {
  constructor(private readonly createCropService: CreateCropService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar uma nova cultura' })
  @ApiResponse({ status: 201, description: 'Cultura criada com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro inesperado ao criar cultura',
    type: CreateCropUnexpectedError,
  })
  async create(
    @Body() { culture, harvest, farmId }: CreateCropDTO,
  ): Promise<void> {
    return this.createCropService.execute({ culture, harvest, farmId });
  }
}
