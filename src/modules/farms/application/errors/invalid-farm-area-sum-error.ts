import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const message =
  'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.';
const error = `invalid_farm_area_sum`;

export class InvalidFarmAreaSumError extends BadRequestException {
  @ApiProperty({ example: message })
  public message!: string;

  @ApiProperty({ example: error })
  public error!: string;

  constructor() {
    super(message, error);
  }
}
