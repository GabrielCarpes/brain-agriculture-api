import { removeIdentificationMask } from '@shared/utils/removeIdentificationMask';
import { TransformFnParams } from 'class-transformer';

export function transformIdentificationValue({
  obj,
  value,
}: TransformFnParams) {
  return removeIdentificationMask(value);
}
