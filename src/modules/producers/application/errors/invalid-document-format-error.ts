import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InvalidDocumentFormatError extends BadRequestException {
  @ApiProperty({ example: 'Invalid document format' })
  public readonly message: string;

  @ApiProperty({ example: `invalid_document_format_error` })
  public readonly error: string;

  constructor() {
    super('Invalid document format', `invalid_document_format_error`);
    this.message = 'Invalid document format';
    this.error = `invalid_document_format_error`;
  }
}
