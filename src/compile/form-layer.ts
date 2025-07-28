import type { BarrierNormed, Bit, GateNormed, MeasureNormed, Operation, OperationLayer, OperationNormed, OpLayerMapping } from "../dtypes";
import { bitToString } from "./bit-register";


export const zero_target_control_gates = [
  // no-target
  "cp"
];

export const single_target_control_gates = [
  // single-target
  "mcx", "cccx", "c3x", "ccccx", "c4x", "ccx", "c2x",
  "ch", "cs", "csdg", "csx", "cx", "cy", "cz", "ccz",
  "crx", "cry", "crz", "cu", "cu1", "cu3",
  "dcx", "ecr",
  "mrcx",
  "rccx", "rcccx",
];

export const double_target_control_gates = [
  // double-target
  "cswap"
];

export const parameter_gates = [
  "crx", "cry", "crz", "cu", "cu1", "cu3",
  "rzz", "cp", "rxx", "ryy", "rzx", "xx_minus_yy", "xx_plus_yy",
  "p", "r", "rx", "ry", "rz", "u", "u1", "u2", "u3"
];

export const swap_gates = [
  "cswap",
  "iswap",
  "swap"
];

export const simple_single_gates = [
  "h", "i", "s", "sdg", "sx", "sxdg", "t", "tdg", "x", "y", "z"
];

export const non_gates = [
  "measure", "barrier"
]

export const NonCustomOpNames = [
  ...simple_single_gates,
  ...zero_target_control_gates,
  ...single_target_control_gates,
  ...double_target_control_gates,
  ...parameter_gates,
  ...swap_gates,
  ...non_gates
];

export function makeOperationLayers(
  ops: Operation[],
  qubit_register: Bit[],
  clbit_register?: Bit[]
): {
  layers: OperationLayer[],
  mapping: OpLayerMapping
} {
  let layers_raw: { [key: number]: Operation[] } = {};
  let qubit_line_saturation: { [key: string]: number } = {};
  let mapping: OpLayerMapping = {};
  let opi = 0;
  for (const op of ops) {
    // normalize the operation
    let opNormed = normalizeOperation(op, qubit_register, clbit_register);
    if (op.detail) {
      opNormed.detail = op.detail;
    }
    let qubits_applied: string[] = opNormed.qubits?.map((d) => bitToString(d)) ?? [];
    if ('controls' in opNormed && opNormed.controls) {
      qubits_applied.push(...opNormed.controls?.map((d) => bitToString(d)));
    }
    let layer_to_put = qubits_applied.map((qstr) => (qubit_line_saturation[qstr] ?? -1) + 1);
    let layer_index = Math.max(...layer_to_put);

    // to layer
    if (!(layer_index in layers_raw)) {
      layers_raw[layer_index] = [];
    }
    layers_raw[layer_index].push(opNormed);
    // mapping record
    mapping[opi] = [layer_index, layers_raw[layer_index].length - 1];
    // qubit-line-counts
    if (opNormed.name === 'measure') {
      for (const qstr in qubit_line_saturation) {
        qubit_line_saturation[qstr] = Math.max(qubit_line_saturation[qstr], layer_index);
      }
    } else {
      qubits_applied.forEach((qstr) => {
        qubit_line_saturation[qstr] = layer_index;
      })
    }
    opi++;
  }
  let layers = Object.keys(layers_raw).map((d) => {
    let index = parseInt(d)
    return {
      index,
      num_operations: layers_raw[index].length,
      operations: layers_raw[index]
    } as OperationLayer;
  })
  layers.sort((a, b) => a.index - b.index);

  return { layers, mapping };
}

export function normalizeOperation(op: Operation, qubit_register: Bit[], clbit_register?: Bit[]): OperationNormed {
  let name = op.name;
  let is_custom = !NonCustomOpNames.includes(name);
  let raw_qubits = ('qubits' in op && op.qubits !== undefined) ? (op.qubits instanceof Array ? op.qubits : [op.qubits]) : null;
  // normalize qubits
  let qubits: Bit[] | null = raw_qubits ? raw_qubits.map(bit => normalizeBits(bit, qubit_register)) : null;
  let num_qubits = 0;
  let num_clbits = 0;
  if (name === 'barrier') {
    if (!qubits) {
      qubits = qubit_register;
    }
    num_qubits = qubits.length;
    return {
      name,
      is_custom,
      qubits,
      num_qubits,
      num_clbits
    } as BarrierNormed
  } else if (name == 'measure') {
    let raw_clbits = ('clbits' in op && op.clbits !== undefined) ? (op.clbits instanceof Array ? op.clbits : [op.clbits]) : null;
    if (raw_clbits && !clbit_register) {
      throw new Error("Classical bit register is not provided!");
    }
    let clbits: Bit[] | null = (raw_clbits && clbit_register) ? raw_clbits.map(bit => normalizeBits(bit, clbit_register)) : null;
    if (!clbits || !qubits) {
      throw new Error("Bits not found")
    }
    if (clbits.length !== 1) {
      throw new Error("Classical bits for measurement can only be 1.")
    }
    num_clbits = 1;
    return {
      name,
      is_custom,
      qubits,
      clbits,
      num_qubits,
      num_clbits
    } as MeasureNormed
  } else {
    let raw_controls = ('controls' in op && op.controls !== undefined) ? (op.controls instanceof Array ? op.controls : [op.controls]) : null;
    let controls: Bit[] | null = raw_controls ? raw_controls.map(bit => normalizeBits(bit, qubit_register)) : null;
    if (!qubits) {
      throw new Error("Bits not found: " + qubits)
    }
    num_qubits = qubits.length;
    let operation: GateNormed = {
      name,
      is_custom,
      qubits,
      num_qubits,
      num_clbits
    }
    if (controls) {
      operation.controls = controls;
      operation.num_qubits += controls.length;
    }
    if ('params' in op && op.params) {
      operation.params = op.params;
    }
    return operation;
  }
}

export function normalizeBits(bit: Bit | number, register: Bit[]): Bit {
  let out: Bit | null | undefined;
  if (typeof bit === 'number') {
    out = register.filter(b => b.index == bit)[0] ?? null;
  } else if (bit.register) {
    out = bit;
  }
  if (out === undefined || out == null) {
    throw new Error("Cannot find a bit from the register");
  } else {
    return out as Bit;
  }
}