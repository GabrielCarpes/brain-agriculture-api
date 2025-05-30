import { Producer } from '../entities/producer';

export abstract class ProducerRepository {
  abstract create(producer: Producer): Promise<void>;

  abstract findByDocument(document: string): Promise<Producer | null>;

  abstract findAll(): Promise<Producer[]>;

  abstract update(id: string, data: Partial<Producer>): Promise<void>;

  abstract delete(id: string): Promise<void>;
}
