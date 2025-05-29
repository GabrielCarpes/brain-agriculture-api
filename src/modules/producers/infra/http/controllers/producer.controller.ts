import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProducerDTO } from '../dtos/create-producer.dto';
import { InvalidProducerFieldsException } from '../dtos/invalid-fields-exception.dto';
import { CreateProducerUnexpectedError } from '@modules/producers/application/errors/create-producer-unexpected-error';
import { InvalidDocumentFormatError } from '@modules/producers/application/errors/invalid-document-format-error';
import { CreateProducerService } from '@modules/producers/application/services/create-producer.service';

@ApiTags('Produtores')
@Controller('producers')
export class ProducerController {
  constructor(private readonly createProducerService: CreateProducerService) {}

  @ApiOperation({
    summary: 'Criar um novo produtor',
    description: `
      Cria um novo produtor com documento (CPF/CNPJ) válido, nome e informações das fazendas associadas.
    `,
  })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateProducerDTO,
    description: 'Objeto contendo os dados do produtor a ser criado.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Produtor criado com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Campos obrigatórios ausentes ou inválidos.',
    type: InvalidProducerFieldsException,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Formato de documento inválido (CPF ou CNPJ).',
    type: InvalidDocumentFormatError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao tentar criar o produtor.',
    type: CreateProducerUnexpectedError,
  })
  @Post()
  async createProducer(
    @Body() { name, document }: CreateProducerDTO,
  ): Promise<void> {
    await this.createProducerService.execute({ name, document });
  }
}
