export type Bit = {
  index: number,
  register: BitRegister,
  is_ancilla?: boolean
};

export type BitRegister = {
  name: string,
  n_bits: number
};

export function isBitRegister(reg: any): reg is BitRegister {
  return reg instanceof Object
    && reg.name !== undefined
    && typeof reg.name === 'string'
    && reg.n_bits !== undefined
    && typeof reg.n_bits === 'number';
}

export function isBitType(bit: any): bit is Bit {
  return bit instanceof Object
    && bit.index !== undefined
    && typeof bit.index === 'number'
    && bit.register !== undefined
    && isBitRegister(bit.register);
}