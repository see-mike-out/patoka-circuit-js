# patoka-circuit-js

Patoka's Circuit Visualization for Pure JavaScript

## How to Use

**Pipeline**: `prepare` --> `compile` --> `draw`

### Write a spec

```javascript

let spec = {
  selector: '#circuit-0', // DOM selector

  // qubits: 3 // by the number of qubits (normalized to below)
  // qubits: [0, 1, 2] // by the qubit indices (normalized to below)
  qubits: [
    {index: 0, register: {name: 'qubits', n_bits: 3}},
    {index: 1, register: {name: 'qubits', n_bits: 3}},
    {index: 2, register: {name: 'qubits', n_bits: 3}}
  ], // by the full indication (recommended); for Physical qubits, this is highly recommended
  
  
  // clbits: 3 // by the number of classical bits (normalized to below)
  // clbits: [0, 1, 2] // by the classical bit indices (normalized to below)
  clbits: [
    {index: 0, register: {name: 'clbits', n_bits: 3}},
    {index: 1, register: {name: 'clbits', n_bits: 3}},
    {index: 2, register: {name: 'clbits', n_bits: 3}}
  ], // by the full indication (recommended); for Physical qubits, this is highly recommended
  
  operations: [{
    name: 'h',
    is_custom: false,
    qubits: 0 // [0, 0]
  }, {
    name: 'cx',
    is_custom: false,
    controls: [{index: 0, register: {name: 'qubits', n_bits: 3}}]
    qubits: [{index: 1, register: {name: 'qubits', n_bits: 3}}] 
  }, {
    name: 'rz',
    is_custom: false,
    qubits: [{index: 1, register: {name: 'qubits', n_bits: 3}}],
    params: [Math.PI / 2]
  }, {
    name: 'measure',
    is_custom: false,
    qubits: [1], 
    clbits: [1] 
  }, ...], // different ways to specify operations
  // operations: [
    // {
    //   index: 0,
    //   num_operations: 2,
    //   operations: [...] // in the same operation format
    // }, ...
  // ] // by already laid out layers

  globalPhase: Math.PI/8, // optional
  // globalPhase: 'π/8', //  in string
  
  options: {
    showMoments: true, // showing layer numbers
    filterUnusedQubits: boolean, // filter out unused qubits
    pagination: ..., // pagination (see below)
    isOriginal: boolean, // if it is the original circuit as opposed to transpiled ones
    unitId: string, // parent wrapper's id in case there are multiple sets of circuits
    circuitSelectorName?: {
      '#circuit-0': 'Original',
      '#circuit-1': 'Transpiled-1',
      '#circuit-2': 'Transpiled-2'
    } // for tooltips
  }, // (optional)
  matchData: [ ... ] // (optional) see below
  interaction: { ... } // (optional) see below
};
```

#### Match

Default structure is:

```javascript
 [{
    selector: "#circuit-9",
    data: {
      bit: [
        { type: 'qubit', from: 13, to: 0, is_ancilla: false }, // typing is important!
        { type: 'qubit', from: 14, to: 1, is_ancilla: false },
        { type: 'qubit', from: 15, to: 2, is_ancilla: false },
        { type: 'clbit', from: 0, to: 0, is_ancilla: false },
        { type: 'clbit', from: 1, to: 1, is_ancilla: false },
        { type: 'clbit', from: 2, to: 2, is_ancilla: false },
      ],

      // If `operations` is provided as a list of operations
      ayer: [
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

      // If `operations` is provided as layered operations
      // [a, b]
      // - a: layer index
      // - b: operation index in Layer a
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
  }],
```

#### Interaction

It's possible to specify custom interactions in addition to default ones.
`makeTooltip`, `moveTooltip`, `clearTooltip` are provided as presets.

```javascript
{
  onMouseOver: (event, role, content, clicked) => {
    // event: Event
    // role: string
    // content: tooltip content (auto generated)
    // clicked: if it is a click event
    if (role === 'gate-group-click-wrap') {
      // event, content, unitId
      makeTooltip(event, content, 'vis-wrap-00001');
    }
  },
  onClick: (event, role, content, clicked) => {},
  onFocus: (event, role, content, clicked) => {}
  onMouseMove: (event, role) => {
    // event: Event
    // role: string
    if (role === 'gate-group-click-wrap') {
      // event, unitId
      moveTooltip(event, 'vis-wrap-00001');
    }
  },
  onMouseOut: (event, role) => {
    // event: Event
    // role: string
    if (role == 'gate-group-click-wrap') {
      // unitId
      clearTooltip('vis-wrap-00001');
    }
  },
  onBlur: (event, role) => {}
}
```

##### Triggerable role names

- `gate-group-click-wrap`: Operations
- `qubit-group-click-wrap`: Qubits (on the left)

### For Vanilla JS

#### Import

```html
  <link href="./dist/echo.css" rel="stylesheet" type="text/css" />
  <script src="./dist/echo.umd.js"></script>
```

#### Code

```html
...
<div id="vis-wrap-00001">
  <h2>Original</h2>
  <div id="circuit-0"></div>
  <h2>Transpiled 1</h2>
  <div id="circuit-1"></div>
  <h2>Transpiled 2</h2>
  <div id="circuit-2"></div>
</div>
...
```

```javascript

// HTML selector
let selector0 = '#circuit-0';
let selector1 = '#circuit-1';
let selector2 = '#circuit-2';
let unitId = 'vis-wrap-00001`;

let prep0 = echo.prepareData(spec0);
let prep1 = echo.prepareData(spec1);
let prep2 = echo.prepareData(spec2);

let circuit_set = {
  [selector0]: prep0,
  [selector1]: prep1,
  [selector2]: prep2,
}

echo.compileSpec(prep0, circuit_set);
```

For details: take a look at `index.html` and `public/draw_test.js`.

### For Module (Node based web apps)

For details: take a look at `index_module.html` and `public/draw_test_module.ts`.
