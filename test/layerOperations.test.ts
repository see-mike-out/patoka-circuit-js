import { expect, test } from 'vitest';
import { convertNumBitsToRegisteredBits, makeOperationLayers } from "../src/compile";
import { Barrier, BitRegister, Gate, Measure, Operation, OperationLayer, OpLayerMapping } from '../src/dtypes';
import { clbit_register, operations, qubit_register } from './testData';


test('layer operations', () => {
  let compiled_raw = makeOperationLayers(operations, qubit_register.bits, clbit_register.bits);
  let compiled = compiled_raw.layers;
  let compile_mapping = compiled_raw.mapping;

  let answer: OperationLayer[] = [
    {
      index: 0,
      num_operations: 3,
      operations: [
        {
          name: 'h',
          is_custom: false,
          qubits: [qubit_register.bits[0]],
          num_qubits: 1,
          num_clbits: 0
        }, {
          name: 'h',
          is_custom: false,
          qubits: [qubit_register.bits[1]],
          num_qubits: 1,
          num_clbits: 0
        }, {
          name: 'h',
          is_custom: false,
          qubits: [qubit_register.bits[2]],
          num_qubits: 1,
          num_clbits: 0
        }
      ]
    }, {
      index: 1,
      num_operations: 2,
      operations: [
        {
          name: 'rz',
          is_custom: false,
          qubits: [qubit_register.bits[0]],
          params: [Math.PI / 2],
          num_qubits: 1,
          num_clbits: 0
        }, {
          name: 'x',
          is_custom: false,
          qubits: [qubit_register.bits[2]],
          num_qubits: 1,
          num_clbits: 0
        }
      ]
    }, {
      index: 2,
      num_operations: 1,
      operations: [
        {
          name: 'cx',
          is_custom: false,
          qubits: [qubit_register.bits[1]],
          controls: [qubit_register.bits[0]],
          num_qubits: 2,
          num_clbits: 0
        }
      ]
    }, {
      index: 3,
      num_operations: 1,
      operations: [
        {
          name: 'ccx',
          is_custom: false,
          qubits: [qubit_register.bits[2]],
          controls: [qubit_register.bits[0], qubit_register.bits[1]],
          num_qubits: 3,
          num_clbits: 0
        }
      ]
    }, {
      index: 4,
      num_operations: 1,
      operations: [
        {
          name: 'measure',
          is_custom: false,
          qubits: [qubit_register.bits[2]],
          clbits: [clbit_register.bits[2]],
          num_qubits: 0,
          num_clbits: 1
        }
      ]
    }, {
      index: 5,
      num_operations: 1,
      operations: [
        {
          name: 'barrier',
          is_custom: false,
          qubits: qubit_register.bits,
          num_qubits: 3,
          num_clbits: 0
        }
      ]
    }, {
      index: 6,
      num_operations: 1,
      operations: [
        {
          name: 'measure',
          is_custom: false,
          qubits: [qubit_register.bits[0]],
          clbits: [clbit_register.bits[0]],
          num_qubits: 0,
          num_clbits: 1
        }
      ]
    }, {
      index: 7,
      num_operations: 1,
      operations: [
        {
          name: 'measure',
          is_custom: false,
          qubits: [qubit_register.bits[1]],
          clbits: [clbit_register.bits[1]],
          num_qubits: 0,
          num_clbits: 1
        }
      ]
    }
  ];

  let answer_mapping: OpLayerMapping = {
    0: [0, 0], // h
    1: [1, 0], // rz
    2: [0, 1], // h
    3: [2, 0], // cx
    4: [0, 2], // h
    5: [1, 1], // x
    6: [3, 0], // ccx
    7: [4, 0], // m
    8: [5, 0], // ba
    9: [6, 0], // m
    10: [7, 0] // m
  };

  expect(compiled.length).toBe(answer.length);
  expect(compiled[0]).toEqual(answer[0]);
  expect(compiled[1]).toEqual(answer[1]);
  expect(compiled[2]).toEqual(answer[2]);
  expect(compiled[3]).toEqual(answer[3]);
  expect(compiled[4]).toEqual(answer[4]);
  expect(compiled[5]).toEqual(answer[5]);
  expect(compiled[6]).toEqual(answer[6]);
  expect(compiled[7]).toEqual(answer[7]);
  expect(compiled).toEqual(answer);
  expect(compile_mapping).toEqual(answer_mapping);
});