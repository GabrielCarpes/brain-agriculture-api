import { Crop } from "../entities/crops";

export abstract class CropRepository {
  abstract create(crop: Crop): Promise<void>;
}
