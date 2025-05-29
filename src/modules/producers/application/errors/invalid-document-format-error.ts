import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../package.json';

export class InvalidDocumentFormatError extends BadRequestException {
  @ApiProperty({ example: 'Invalid document format' })
  public readonly message: string;

  @ApiProperty({ example: `${name}/invalid_document_format_error` })
  public readonly error: string;

  constructor() {
    super('Invalid document format', `${name}/invalid_document_format_error`);
    this.message = 'Invalid document format';
    this.error = `${name}/invalid_document_format_error`;
  }
}
