import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unexpected error while retrieving all producers';
const error = `get_all_producers_unexpected_error`;

export class GetAllProducersUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
