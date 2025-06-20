import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Unexpected error while creating crop';
const error = `create_crop_unexpected_error`;

export class CreateCropUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
