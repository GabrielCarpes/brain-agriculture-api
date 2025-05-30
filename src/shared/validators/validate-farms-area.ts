export function validateFarmAreas(
  totalArea: number = 0,
  arableArea: number = 0,
  vegetationArea: number = 0,
): boolean {
  return arableArea + vegetationArea > totalArea;
}
