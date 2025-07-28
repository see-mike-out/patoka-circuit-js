import { expect, test } from 'vitest';
import { convertNumBitsToRegisteredBits } from "../src/compile";
import { BitRegister } from '../src/dtypes';

test('get registered bits from a number of bits', () => {
  let compiled = convertNumBitsToRegisteredBits(3, 'qubit');

  let answer_register: BitRegister = {
    name: 'qubit',
    n_bits: 3
  };

  expect(compiled.bits).toEqual([
    { index: 0, register: answer_register },
    { index: 1, register: answer_register },
    { index: 2, register: answer_register }
  ]);
  expect(compiled.register).toEqual(answer_register)
});