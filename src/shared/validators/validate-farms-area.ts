export function validateFarmAreas(
  totalArea: number,
  arableArea: number = 0,
  vegetationArea: number = 0,
): boolean {
  return arableArea + vegetationArea > totalArea;
}
