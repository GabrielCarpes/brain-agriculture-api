import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateProducerDTO {
  @ApiPropertyOptional({ example: 'Maria Oliveira' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '98765432100', description: 'Novo CPF ou CNPJ' })
  @IsOptional()
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'Document must be a valid CPF (11 digits) or CNPJ (14 digits)',
  })
  document?: string;
}
