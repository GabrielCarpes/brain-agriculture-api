import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateProducerDTO } from '../dtos/create-producer.dto';
import { InvalidProducerFieldsException } from '../dtos/invalid-fields-exception.dto';
import { InvalidDocumentFormatError } from '@modules/producers/application/errors/invalid-document-format-error';
import { CreateProducerUnexpectedError } from '@modules/producers/application/errors/create-producer-unexpected-error';
import { CreateProducerService } from '@modules/producers/application/services/create-producer.service';
import { DeleteProducerService } from '@modules/producers/application/services/delete-producer.service';
import { UpdateProducerService } from '@modules/producers/application/services/update-producer.service';
import { UpdateProducerDTO } from '../dtos/update-producer.dto';
import { GetAllProducersService } from '@modules/producers/application/services/get-all-producer.service';
import { UpdateProducerUnexpectedError } from '@modules/producers/application/errors/update-producer-unexpected-error';
import { DeleteProducerUnexpectedError } from '@modules/producers/application/errors/delete-producer-unexpected-error';
import { ProducerResponseDTO } from '../dtos/producer-response.dto';

@ApiTags('Produtores')
@Controller('producers')
export class ProducerController {
  constructor(
    private readonly createProducerService: CreateProducerService,
    private readonly deleteProducerService: DeleteProducerService,
    private readonly updateProducerService: UpdateProducerService,
    private readonly getAllProducersService: GetAllProducersService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um novo produtor',
    description: 'Cria um produtor com nome e CPF ou CNPJ válidos.',
  })
  @ApiBody({ type: CreateProducerDTO, description: 'Dados do produtor a ser criado.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Produtor criado com sucesso.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Campos obrigatórios ausentes ou inválidos.',
    type: InvalidProducerFieldsException,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Formato inválido de CPF ou CNPJ.',
    type: InvalidDocumentFormatError,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao criar o produtor.',
    type: CreateProducerUnexpectedError,
  })
  @HttpCode(HttpStatus.CREATED)
  async createProducer(
    @Body() { name, document }: CreateProducerDTO,
  ): Promise<void> {
    await this.createProducerService.execute({ name, document });
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar produtor por ID',
    description: 'Remove um produtor existente utilizando seu CPF ou CNPJ.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID do produtor' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Produtor removido com sucesso.' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao deletar o produtor.',
    type: DeleteProducerUnexpectedError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProducer(@Param('id') id: string): Promise<void> {
    await this.deleteProducerService.execute(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar produtor por id',
    description: 'Atualiza os dados de um produtor utilizando seu ID.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID do produtor' })
  @ApiBody({ type: UpdateProducerDTO, description: 'Novos dados do produtor.' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Produtor atualizado com sucesso.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Campos de atualização inválidos.',
    type: InvalidProducerFieldsException,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao atualizar o produtor.',
    type: UpdateProducerUnexpectedError,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateProducer(
    @Param('id') id: string,
    @Body() updateDto: UpdateProducerDTO,
  ): Promise<void> {
    await this.updateProducerService.execute(id, updateDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os produtores',
    description: 'Retorna uma lista de todos os produtores cadastrados.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Produtores listados com sucesso.',
    type: [ProducerResponseDTO],
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro inesperado ao buscar os produtores.',
  })
  async getAll(): Promise<ProducerResponseDTO[]> {
    return this.getAllProducersService.execute();
  }
}
