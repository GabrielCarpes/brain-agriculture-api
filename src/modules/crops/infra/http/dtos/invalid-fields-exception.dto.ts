import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { name } from '../../../../../../package.json';

const cropError = `${name}/invalid_crop_fields_exception`;

export class InvalidCropFieldsException extends BadRequestException {
  @ApiProperty({
    type: [String],
    example: [
      'O campo culture é obrigatório.',
      'O campo harvest é obrigatório.',
      'O campo farmId é obrigatório.',
    ],
  })
  public messages!: string[];

  @ApiProperty({ example: cropError })
  public error!: string;

  constructor(messages: string[]) {
    super(messages, cropError);
    this.messages = messages;
    this.error = cropError;
  }
}
