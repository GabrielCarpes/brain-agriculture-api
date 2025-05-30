import { ApiProperty } from '@nestjs/swagger';

export class ProducerResponseDTO {
  @ApiProperty({ example: '12345678901', description: 'Documento do produtor (CPF ou CNPJ)' })
  document!: string;

  @ApiProperty({ example: 'João da Silva', description: 'Nome do produtor' })
  name!: string;

  @ApiProperty({
    description: 'Lista de fazendas associadas ao produtor',
    type: () => [FarmResponse],
  })
  farms!: FarmResponse[];
}

class FarmResponse {
  @ApiProperty({ example: 'Fazenda Boa Esperança', description: 'Nome da fazenda' })
  name!: string;

  @ApiProperty({ example: 'Rio Verde', description: 'Cidade onde a fazenda está localizada' })
  city!: string;

  @ApiProperty({ example: 'GO', description: 'Estado onde a fazenda está localizada' })
  state!: string;

  @ApiProperty({ example: 300, description: 'Área total da fazenda em hectares' })
  totalArea!: number;

  @ApiProperty({ example: 200, description: 'Área agricultável da fazenda em hectares' })
  arableArea!: number;

  @ApiProperty({ example: 100, description: 'Área de vegetação da fazenda em hectares' })
  vegetationArea!: number;

  @ApiProperty({
    description: 'Lista de culturas cultivadas na fazenda',
    type: () => [CropResponse],
  })
  crops!: CropResponse[];
}

class CropResponse {
  @ApiProperty({ example: 'Soja', description: 'Tipo da cultura' })
  culture!: string;

  @ApiProperty({ example: '2024/2025', description: 'Safra da cultura' })
  harvest!: string;
}
