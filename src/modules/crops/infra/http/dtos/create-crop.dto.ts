import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCropDTO {
  @ApiProperty({ example: 'Soja' })
  @IsString()
  @IsNotEmpty({ message: 'A cultura é obrigatória.' })
  culture!: string;

  @ApiProperty({ example: '2024/2025' })
  @IsString()
  @IsNotEmpty({ message: 'A safra é obrigatória.' })
  harvest!: string;

  @ApiProperty({ example: '27e99da2-4f61-4f2b-b2e9-dc2c097a0abc' })
  @IsString()
  @IsNotEmpty({ message: 'O ID da fazenda é obrigatório.' })
  farmId!: string;
}
