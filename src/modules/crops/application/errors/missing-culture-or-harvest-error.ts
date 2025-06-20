import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message = 'Cultura e safra são obrigatórias.';
const error = `missing_culture_or_harvest`;

export class MissingCultureOrHarvestError extends BadRequestException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
