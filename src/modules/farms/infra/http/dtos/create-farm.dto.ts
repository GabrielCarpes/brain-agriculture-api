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
  @ApiProperty({ example: 'Milho' })
  @IsString()
  @IsNotEmpty()
  culture!: string;

  @ApiProperty({ example: '2024/2025' })
  @IsString()
  @IsNotEmpty()
  harvest!: string;

  @ApiProperty({ example: '27e99da2-4f61-4f2b-b2e9-dc2c097a0abc' })
  @IsString()
  @IsNotEmpty({ message: 'O ID da fazenda é obrigatório.' })
  farmId!: string;
}

export class CreateFarmDTO {
  @ApiProperty({ example: 'Fazenda Boa Esperança' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Uberaba' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: '27e99da2-4f61-4f2b-b2e9-dc2c097a0abc' })
  @IsString()
  @IsNotEmpty({ message: 'O ID do produtor é obrigatório.' })
  producerId!: string;

  @ApiProperty({ example: 'MG' })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ example: 120 })
  @IsNumber()
  @Min(0)
  totalArea!: number;

  @ApiProperty({ example: 80 })
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
