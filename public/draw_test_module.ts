// @ts-nocheck
import { clearTooltip, makeTooltip, moveTooltip, prepareData } from "../src";
import { runEcho } from "../src";

let selector0 = '#circuit-0',
  selector1 = '#circuit-1',
  selector2 = '#circuit-2';
let circuitSelectorName = {
  [selector0]: 'Original',
  [selector1]: 'Transpiled-1',
  [selector2]: 'Transpiled-2'
}

let interaction = {
  onMouseOver: (event, role, content, clicked) => {
    if (role === 'gate-group-click-wrap') {
      makeTooltip(event, content, 'vis-wrap-00001');
    }
  },
  onMouseMove: (event, role) => {
    if (role === 'gate-group-click-wrap') {
      moveTooltip(event, 'vis-wrap-00001');
    }
  },
  onMouseOut: (event, role) => {
    if (role == 'gate-group-click-wrap') {
      clearTooltip('vis-wrap-00001');
    }
  },
}

let operations0 = [
  {
    name: 'h',
    is_custom: false,
    qubits: 0 // [0, 0]
  }, {
    name: 'h',
    is_custom: false,
    qubits: 1 // [0, 1]
  }, {
    name: 'cx',
    is_custom: false,
    qubits: 1,
    controls: 0 // [1, 0]
  }, {
    name: 'x',
    is_custom: false,
    qubits: 2 // [0, 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: 2,
    clbits: 2 // [1, 1]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: 1,
    clbits: 1 // [2, 0]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: 0,
    clbits: 0, // [3, 0]
  }
];

let operations1 = [
  {
    name: 'rz',
    is_custom: false,
    qubits: { index: 13, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 4] // [0, 0]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 13, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 2] // [1, 0]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 14, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 4] // [0, 1]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 14, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 2] // [1, 1]
  }, {
    name: 'ecr',
    is_custom: false,
    qubits: { index: 14, register: { name: 'qubits', n_bits: 133 } },
    controls: { index: 13, register: { name: 'qubits', n_bits: 133 } },
    // [2, 0]
  }, {
    name: 'x',
    is_custom: false,
    qubits: { index: 15, register: { name: 'qubits', n_bits: 133 } },
    // [0, 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 15, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 2, register: { name: 'clbits', n_bits: 3 } },
    // [1, 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 14, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 1, register: { name: 'clbits', n_bits: 3 } },
    // [3, 0]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 13, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 0, register: { name: 'clbits', n_bits: 3 } },
    // [4, 0]
  }
];

let operations2 = [
  {
    name: 'rz',
    is_custom: false,
    qubits: { index: 27, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 3]
    // [0, 0]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 27, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 3]
    // [1, 0]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 27, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 2]
    // [2, 0]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 16, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 3]
    // [0, 1]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 16, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 3]
    // [1, 1]
  }, {
    name: 'rz',
    is_custom: false,
    qubits: { index: 16, register: { name: 'qubits', n_bits: 133 } },
    params: [Math.PI / 2]
    // [2, 2]
  }, {
    name: 'ecr',
    is_custom: false,
    qubits: { index: 16, register: { name: 'qubits', n_bits: 133 } },
    controls: { index: 27, register: { name: 'qubits', n_bits: 133 } },
    // [3, 0]
  }, {
    name: 'swap',
    is_custom: false,
    qubits: [
      { index: 16, register: { name: 'qubits', n_bits: 133 } },
      { index: 27, register: { name: 'qubits', n_bits: 133 } }
    ],
    // [4, 0]
  }, {
    name: 'x',
    is_custom: false,
    qubits: { index: 33, register: { name: 'qubits', n_bits: 133 } },
    // [0, 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 33, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 2, register: { name: 'clbits', n_bits: 3 } },
    // [1, 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 16, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 1, register: { name: 'clbits', n_bits: 3 } },
    // [5, 0]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: { index: 27, register: { name: 'qubits', n_bits: 133 } },
    clbits: { index: 0, register: { name: 'clbits', n_bits: 3 } },
    // [6, 0]
  }
];

let spec0 = {
  selector: selector0,
  qubits: 3,
  clbits: 3,
  operations: operations0,
  matchData: [{
    selector: selector1,
    data: {
      bit: [
        { type: 'qubit', from: 0, to: 13, is_ancilla: false },
        { type: 'qubit', from: 1, to: 14, is_ancilla: false },
        { type: 'qubit', from: 2, to: 15, is_ancilla: false },
        { type: 'clbit', from: 0, to: 0, is_ancilla: false },
        { type: 'clbit', from: 1, to: 1, is_ancilla: false },
        { type: 'clbit', from: 2, to: 2, is_ancilla: false },
      ],
      layer: [
        { from: 0, to: { matches: [0, 1], complete: true } },
        { from: 1, to: { matches: [2, 3], complete: true } },
        { from: 2, to: { matches: [4], complete: true } },
        { from: 3, to: { matches: [5], complete: true } },
        { from: 4, to: { matches: [6], complete: true } },
        { from: 5, to: { matches: [7], complete: true } },
        { from: 6, to: { matches: [8], complete: true } }
      ]
    }
  }, {
    selector: selector2,
    data: {
      bit: [
        { type: 'qubit', from: 0, to: 27, is_ancilla: false },
        { type: 'qubit', from: 1, to: 16, is_ancilla: false },
        { type: 'qubit', from: 2, to: 33, is_ancilla: false },
        { type: 'clbit', from: 0, to: 0, is_ancilla: false },
        { type: 'clbit', from: 1, to: 1, is_ancilla: false },
        { type: 'clbit', from: 2, to: 2, is_ancilla: false },
      ],
      layer: [
        { from: 0, to: { matches: [0, 1, 2], complete: true } },
        { from: 1, to: { matches: [3, 4, 5], complete: true } },
        { from: 2, to: { matches: [6, 7], complete: true } },
        { from: 3, to: { matches: [8], complete: true } },
        { from: 4, to: { matches: [9], complete: true } },
        { from: 5, to: { matches: [10], complete: true } },
        { from: 6, to: { matches: [11], complete: true } }]
    }
  }],
  options: {
    isOriginal: true,
    unitId: 'vis-wrap-00001',
    circuitSelectorName
  },
  interaction
}

let spec1 = {
  selector: selector1,
  qubits: [
    { index: 13, register: { name: 'qubits', n_bits: 133 } },
    { index: 14, register: { name: 'qubits', n_bits: 133 } },
    { index: 15, register: { name: 'qubits', n_bits: 133 } }
  ],
  clbits: 3,
  operations: operations1,
  matchData: [{
    selector: selector0,
    data: {
      bit: [
        { type: 'qubit', from: 13, to: 0, is_ancilla: false },
        { type: 'qubit', from: 14, to: 1, is_ancilla: false },
        { type: 'qubit', from: 15, to: 2, is_ancilla: false },
        { type: 'clbit', from: 0, to: 0, is_ancilla: false },
        { type: 'clbit', from: 1, to: 1, is_ancilla: false },
        { type: 'clbit', from: 2, to: 2, is_ancilla: false },
      ],
      layer: [
        { from: 0, to: { matches: [0], complete: true } },
        { from: 1, to: { matches: [0], complete: true } },
        { from: 2, to: { matches: [1], complete: true } },
        { from: 3, to: { matches: [1], complete: true } },
        { from: 4, to: { matches: [2], complete: true } },
        { from: 5, to: { matches: [3], complete: true } },
        { from: 6, to: { matches: [4], complete: true } },
        { from: 7, to: { matches: [5], complete: true } },
        { from: 8, to: { matches: [6], complete: true } }
      ]
    }
  }],
  options: {
    isOriginal: false,
    unitId: 'vis-wrap-00001',
    circuitSelectorName
  },
  interaction
};


let spec2 = {
  selector: selector2,
  qubits: [
    { index: 16, register: { name: 'qubits', n_bits: 133 } },
    { index: 27, register: { name: 'qubits', n_bits: 133 } },
    { index: 33, register: { name: 'qubits', n_bits: 133 } }
  ],
  clbits: 3,
  operations: operations2,
  matchData: [{
    selector: selector0,
    data: {
      bit: [
        { type: 'qubit', from: 27, to: 0, is_ancilla: false },
        { type: 'qubit', from: 16, to: 1, is_ancilla: false },
        { type: 'qubit', from: 33, to: 2, is_ancilla: false },
        { type: 'clbit', from: 0, to: 0, is_ancilla: false },
        { type: 'clbit', from: 1, to: 1, is_ancilla: false },
        { type: 'clbit', from: 2, to: 2, is_ancilla: false },
      ],
      layer: [
        { from: 0, to: { matches: [0], complete: true } },
        { from: 1, to: { matches: [0], complete: true } },
        { from: 2, to: { matches: [0], complete: true } },
        { from: 3, to: { matches: [1], complete: true } },
        { from: 4, to: { matches: [1], complete: true } },
        { from: 5, to: { matches: [1], complete: true } },
        { from: 6, to: { matches: [2], complete: true } },
        { from: 7, to: { matches: [2], complete: true } },
        { from: 8, to: { matches: [3], complete: true } },
        { from: 9, to: { matches: [4], complete: true } },
        { from: 10, to: { matches: [5], complete: true } },
        { from: 11, to: { matches: [6], complete: true } }
      ]
    }
  }],
  options: {
    isOriginal: false,
    unitId: 'vis-wrap-00001',
    circuitSelectorName
  },
  interaction
};

function draw() {
  // @ts-ignore
  let prep0 = prepareData(spec0);
  // @ts-ignore
  let prep1 = prepareData(spec1);
  // @ts-ignore
  let prep2 = prepareData(spec2);

  let circuit_set = {
    [selector0]: prep0,
    [selector1]: prep1,
    [selector2]: prep2,
  };

  let outcome0 = runEcho(prep0, circuit_set);
  let outcome1 = runEcho(prep1, circuit_set);
  let outcome2 = runEcho(prep2, circuit_set);
}

draw();