import { Crop } from "../../src/modules/crops/domain/entities/crops";
import { ICrop } from "../../src/modules/crops/domain/interfaces/crop.interface";

export function cropMock(overrides: Partial<ICrop> = {}): Crop {
  const base: ICrop = {
    culture: 'Soybean',
    harvest: '2024-03-10',
    farmId: 'fake-farm-id-123',
    ...overrides,
  };

  return new Crop(base);
}
