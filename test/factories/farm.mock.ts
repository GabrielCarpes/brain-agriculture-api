import { faker } from '@faker-js/faker';
import { IFarm } from '../../src/modules/farms/domain/interfaces/farm.interface';

export function farmMock(overrides: Partial<IFarm> = {}): IFarm {
  const totalArea = faker.number.int({ min: 50, max: 500 });
  const arableArea = faker.number.int({ min: 10, max: totalArea / 2 });
  const vegetationArea = totalArea - arableArea;

  return {
    name: faker.company.name(),
    city: faker.location.city(),
    state: faker.location.state(),
    totalArea,
    arableArea,
    vegetationArea,
    producerId: faker.string.uuid(),
    ...overrides,
  };
}
