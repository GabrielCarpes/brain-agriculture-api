export const removeIdentificationMask = (value: any) => {
  const parsedValue =
    typeof value === 'string'
      ? value.replace(/\./g, '').replace(/-/g, '').replace('/', '')
      : value;

  return parsedValue;
};
