import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../package.json';

const message = 'Unexpected error while creating producer';
const error = `${name}/create_producer_unexpected_error`;

export class CreateProducerUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
