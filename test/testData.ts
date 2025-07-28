import { convertNumBitsToRegisteredBits } from "../src/compile";
import { Barrier, Gate, Measure, Operation } from "../src/dtypes";

export let qubit_register = convertNumBitsToRegisteredBits(3, 'qubit');
export let clbit_register = convertNumBitsToRegisteredBits(3, 'clbit');

export let op0: Gate = {
  name: 'h',
  is_custom: false,
  qubits: 0
}, op1: Gate = {
  name: 'rz',
  is_custom: false,
  qubits: 0,
  params: [Math.PI / 2]
}, op1a: Gate = {
  name: 'h',
  is_custom: false,
  qubits: 1
}, op2: Gate = {
  name: 'cx',
  is_custom: false,
  qubits: qubit_register.bits[1],
  controls: qubit_register.bits[0]
}, op2a: Gate = {
  name: 'h',
  is_custom: false,
  qubits: 2
}, op2b: Gate = {
  name: 'x',
  is_custom: false,
  qubits: 2
}, op3: Gate = {
  name: 'ccx',
  is_custom: false,
  qubits: [2],
  controls: [0, 1]
}, op4: Measure = {
  name: 'measure',
  is_custom: false,
  qubits: [qubit_register.bits[2]],
  clbits: [clbit_register.bits[2]]
}, op5: Barrier = {
  name: 'barrier',
  is_custom: false
}, op6: Measure = {
  name: 'measure',
  is_custom: false,
  qubits: [qubit_register.bits[0]],
  clbits: [clbit_register.bits[0]]
}, op7: Measure = {
  name: 'measure',
  is_custom: false,
  qubits: [qubit_register.bits[1]],
  clbits: [clbit_register.bits[1]]
};

export let operations: Operation[] = [
  op0, op1, op1a, op2, op2a, op2b, op3, op4, op5, op6, op7
];