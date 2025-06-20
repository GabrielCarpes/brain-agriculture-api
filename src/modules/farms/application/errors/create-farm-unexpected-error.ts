import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unexpected error while creating farm';
const error = `create_farm_unexpected_error`;

export class CreateFarmUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
