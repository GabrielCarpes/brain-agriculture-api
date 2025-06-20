import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unexpected error while updating producer';
const error = `update_producer_unexpected_error`;

export class UpdateProducerUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
