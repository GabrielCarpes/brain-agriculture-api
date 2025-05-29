import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../package.json';

const message = 'Cultura e safra são obrigatórias.';
const error = `${name}/missing_culture_or_harvest`;

export class MissingCultureOrHarvestError extends BadRequestException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
