import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unexpected error while creating producer';
const error = `create_producer_unexpected_error`;

export class CreateProducerUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
