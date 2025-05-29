import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateCropDTO {
  @ApiProperty({ example: 'Soja' })
  @IsString()
  @IsNotEmpty()
  culture!: string;

  @ApiProperty({ example: '2024/2025' })
  @IsString()
  @IsNotEmpty()
  harvest!: string;
}

class CreateFarmDTO {
  @ApiProperty({ example: 'Fazenda São João' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Ribeirão Preto' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(0)
  totalArea!: number;

  @ApiProperty({ example: 60 })
  @IsNumber()
  @Min(0)
  arableArea!: number;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(0)
  vegetationArea!: number;

  @ApiProperty({
    type: [CreateCropDTO],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCropDTO)
  crops?: CreateCropDTO[];
}

export class CreateProducerDTO {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  @IsNotEmpty()
  document!: string;

  @ApiProperty({
    type: [CreateFarmDTO],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFarmDTO)
  farms?: CreateFarmDTO[];
}
