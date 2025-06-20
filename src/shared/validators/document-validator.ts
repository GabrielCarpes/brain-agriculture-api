import { isCPF, isCNPJ } from 'brazilian-values';

export function isValidCPFOrCNPJ(document: string): boolean {
  return isCPF(document) || isCNPJ(document);
}
