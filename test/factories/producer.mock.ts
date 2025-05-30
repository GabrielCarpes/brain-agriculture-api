import { Producer } from '../../src/modules/producers/domain/entities/producer';
import { IProducer } from '../../src/modules/producers/domain/interfaces/producer.interface';

export function producerMock(overrides: Partial<IProducer> = {}): Producer {
  const base: IProducer = {
    name: 'John Doe',
    document: '12345678901',
    ...overrides,
  };

  return new Producer(base);
}
