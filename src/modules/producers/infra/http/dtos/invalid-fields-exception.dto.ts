import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../../package.json';

const error = `${name}/invalid_producer_fields_exception`;

export class InvalidProducerFieldsException extends BadRequestException {
  @ApiProperty({
    type: [String],
    example: ['O campo nome é obrigatório', 'Documento inválido'],
  })
  messages: string[];

  @ApiProperty({ example: error })
  error: string;

  constructor(messages: string[]) {
    super(messages, error);
    this.messages = messages;
    this.error = error;
  }
}
