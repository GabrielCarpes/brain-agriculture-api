import { Producer } from "../entities/producer";

export abstract class ProducerRepository {
  abstract create(transaction: Producer): Promise<void>;
}
