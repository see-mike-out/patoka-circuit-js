import { selector0, selector1, selector2 } from "./prepTestData";

export let bit0_0 = { index: 0, register: { name: 'qubits', n_bits: 3 } },
  bit0_1 = { index: 1, register: { name: 'qubits', n_bits: 3 } },
  bit0_2 = { index: 2, register: { name: 'qubits', n_bits: 3 } },
  bit1_0 = { index: 13, register: { name: 'qubits', n_bits: 133 } },
  bit1_1 = { index: 14, register: { name: 'qubits', n_bits: 133 } },
  bit1_2 = { index: 15, register: { name: 'qubits', n_bits: 133 } },
  bit2_0 = { index: 27, register: { name: 'qubits', n_bits: 133 } },
  bit2_1 = { index: 16, register: { name: 'qubits', n_bits: 133 } },
  bit2_2 = { index: 33, register: { name: 'qubits', n_bits: 133 } },
  clbit0 = { index: 0, register: { name: 'clbits', n_bits: 3 } },
  clbit1 = { index: 1, register: { name: 'clbits', n_bits: 3 } },
  clbit2 = { index: 2, register: { name: 'clbits', n_bits: 3 } }

export let match_0_1 = {
  selector: selector1,
  data: {
    bit: [
      { type: 'qubit', from: bit0_0, to: bit1_0, is_ancilla: false },
      { type: 'qubit', from: bit0_1, to: bit1_1, is_ancilla: false },
      { type: 'qubit', from: bit0_2, to: bit1_2, is_ancilla: false },
      { type: 'clbit', from: clbit0, to: clbit0, is_ancilla: false },
      { type: 'clbit', from: clbit1, to: clbit1, is_ancilla: false },
      { type: 'clbit', from: clbit2, to: clbit2, is_ancilla: false },
    ],
    layer: [
      { from: [0, 0], to: { matches: [[0, 0], [1, 0]], complete: true } },
      { from: [0, 1], to: { matches: [[0, 1], [1, 1]], complete: true } },
      { from: [1, 0], to: { matches: [[2, 0]], complete: true } },
      { from: [0, 2], to: { matches: [[0, 2]], complete: true } },
      { from: [1, 1], to: { matches: [[1, 2]], complete: true } },
      { from: [2, 0], to: { matches: [[3, 0]], complete: true } },
      { from: [3, 0], to: { matches: [[4, 0]], complete: true } }
    ]
  }
}

export let match_0_2 = {
  selector: selector2,
  data: {
    bit: [
      { type: 'qubit', from: bit0_0, to: bit2_0, is_ancilla: false },
      { type: 'qubit', from: bit0_1, to: bit2_1, is_ancilla: false },
      { type: 'qubit', from: bit0_2, to: bit2_2, is_ancilla: false },
      { type: 'clbit', from: clbit0, to: clbit0, is_ancilla: false },
      { type: 'clbit', from: clbit1, to: clbit1, is_ancilla: false },
      { type: 'clbit', from: clbit2, to: clbit2, is_ancilla: false },
    ],
    layer: [
      { from: [0, 0], to: { matches: [[0, 0], [1, 0], [2, 0]], complete: true } },
      { from: [0, 1], to: { matches: [[0, 1], [1, 1], [2, 1]], complete: true } },
      { from: [1, 0], to: { matches: [[3, 0]], complete: true } },
      { from: [0, 2], to: { matches: [[0, 2]], complete: true } },
      { from: [1, 1], to: { matches: [[1, 2]], complete: true } },
      { from: [2, 0], to: { matches: [[4, 0]], complete: true } },
      { from: [3, 0], to: { matches: [[5, 0]], complete: true } }
    ]
  }
}

export let match_1_0 = {
  selector: selector0,
  data: {
    bit: [
      { type: 'qubit', from: bit1_0, to: bit0_0, is_ancilla: false },
      { type: 'qubit', from: bit1_1, to: bit0_1, is_ancilla: false },
      { type: 'qubit', from: bit1_2, to: bit0_2, is_ancilla: false },
      { type: 'clbit', from: clbit0, to: clbit0, is_ancilla: false },
      { type: 'clbit', from: clbit1, to: clbit1, is_ancilla: false },
      { type: 'clbit', from: clbit2, to: clbit2, is_ancilla: false },
    ],
    layer: [
      { from: [0, 0], to: { matches: [[0, 0]], complete: true } },
      { from: [1, 0], to: { matches: [[0, 0]], complete: true } },
      { from: [0, 1], to: { matches: [[0, 1]], complete: true } },
      { from: [1, 1], to: { matches: [[0, 1]], complete: true } },
      { from: [2, 0], to: { matches: [[1, 0]], complete: true } },
      { from: [0, 2], to: { matches: [[0, 2]], complete: true } },
      { from: [1, 2], to: { matches: [[1, 1]], complete: true } },
      { from: [3, 0], to: { matches: [[2, 0]], complete: true } },
      { from: [4, 0], to: { matches: [[3, 0]], complete: true } }
    ]
  }
}

export let match_2_0 = {
  selector: selector0,
  data: {
    bit: [
      { type: 'qubit', from: bit2_0, to: bit0_0, is_ancilla: false },
      { type: 'qubit', from: bit2_1, to: bit0_1, is_ancilla: false },
      { type: 'qubit', from: bit2_2, to: bit0_2, is_ancilla: false },
      { type: 'clbit', from: clbit0, to: clbit0, is_ancilla: false },
      { type: 'clbit', from: clbit1, to: clbit1, is_ancilla: false },
      { type: 'clbit', from: clbit2, to: clbit2, is_ancilla: false },
    ],
    layer: [
      { from: [0, 0], to: { matches: [[0, 0]], complete: true } },
      { from: [1, 0], to: { matches: [[0, 0]], complete: true } },
      { from: [2, 0], to: { matches: [[0, 0]], complete: true } },
      { from: [0, 1], to: { matches: [[0, 1]], complete: true } },
      { from: [1, 1], to: { matches: [[0, 1]], complete: true } },
      { from: [2, 1], to: { matches: [[0, 1]], complete: true } },
      { from: [3, 0], to: { matches: [[1, 0]], complete: true } },
      { from: [0, 2], to: { matches: [[0, 2]], complete: true } },
      { from: [1, 2], to: { matches: [[1, 1]], complete: true } },
      { from: [4, 0], to: { matches: [[2, 0]], complete: true } },
      { from: [5, 0], to: { matches: [[3, 0]], complete: true } }
    ]
  }
}