import type { Bit, BitRegister } from "../dtypes";

export function convertNumBitsToRegisteredBits(n: number, _name?: string): { bits: Bit[], register: BitRegister } {
  let name = _name ?? "qubits";
  let register: BitRegister = {
    name,
    n_bits: n
  };
  let bits: Bit[] = [];
  for (let i = 0; i < n; i++) {
    bits.push({
      index: i,
      register
    } as Bit);
  }
  return {
    bits,
    register
  };
}

export function bitToString(bit: Bit): string {
  return `${bit.register.name}@${bit.index}`;
}