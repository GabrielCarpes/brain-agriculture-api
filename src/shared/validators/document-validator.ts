import { cpf, cnpj } from 'cpf-cnpj-validator';

export function isValidCPFOrCNPJ(document: string): boolean {
  return cpf.isValid(document) || cnpj.isValid(document);
}
