import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../../package.json';

const farmError = `${name}/invalid_farm_fields_exception`;

export class InvalidFarmFieldsException extends BadRequestException {
  @ApiProperty({
    type: [String],
    example: [
      'O campo name é obrigatório.',
      'O campo city é obrigatório.',
      'O campo state é obrigatório.',
      'O campo totalArea é obrigatório.',
    ],
  })
  public messages!: string[];

  @ApiProperty({ example: farmError })
  public error!: string;

  constructor(messages: string[]) {
    super(messages, farmError);
    this.messages = messages;
    this.error = farmError;
  }
}
