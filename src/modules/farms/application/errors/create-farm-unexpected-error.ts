import { InternalServerErrorException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../package.json';

const message = 'Erro inesperado ao criar fazenda';
const error = `${name}/create_farm_unexpected_error`;

export class CreateFarmUnexpectedError extends InternalServerErrorException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
