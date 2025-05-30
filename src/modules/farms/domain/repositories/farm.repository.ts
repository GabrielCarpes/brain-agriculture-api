import { Farm } from "../entities/farm";

export abstract class FarmRepository {
  abstract create(transaction: Farm): Promise<void>;
}
