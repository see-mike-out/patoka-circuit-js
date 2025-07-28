import { isBitType, isLayeredOperations, isOperation, type Bit, type BitRegister, type Operation, type OperationLayer, type OpLayerMapping } from "../dtypes";
import type { NormedData } from "../dtypes/normed-spec";
import { convertNumBitsToRegisteredBits } from "./bit-register";
import { makeOperationLayers } from "./form-layer";

export function normalizeSpec(
  raw_qubits: number | number[] | Bit[],
  raw_clbits: number | number[] | Bit[],
  raw_operations: Operation[] | OperationLayer[]
): NormedData {
  let qubits_converted = normalizeBits(raw_qubits, 'qubits');
  let qubits = qubits_converted.bits,
    qubit_registers = qubits_converted.registers;
  let num_qubits = qubits.length;
  let num_total_qubits = qubit_registers.map((reg) => reg.n_bits).reduce((acc, cur) => acc + cur, 0);

  let clbits_converted = normalizeBits(raw_clbits, 'clbits');
  let clbits = clbits_converted.bits,
    clbit_registers = clbits_converted.registers;
  let num_clbits = clbits.length;

  let { layers, mapping } = normalizeOperationsToLayers(raw_operations, qubits, clbits);

  return {
    qubits,
    qubit_registers,
    num_qubits,
    num_total_qubits,
    clbits,
    num_clbits,
    clbit_registers,
    layers,
    operation_mapping: mapping
  };
}


function normalizeBits(raw_bits: number | number[] | Bit[], type: string) {
  if (typeof raw_bits === 'number') {
    let { bits, register } = convertNumBitsToRegisteredBits(raw_bits, type);
    return { bits, registers: [register] };
  } else if (raw_bits instanceof Array && raw_bits.every((bit) => typeof bit === 'number')) {
    let n_bits = raw_bits.length;
    let coverted = convertNumBitsToRegisteredBits(n_bits, type);
    let bit_sorted = [...raw_bits];
    bit_sorted.sort((a, b) => a - b);
    let bits = raw_bits.map((d) => {
      return coverted.bits[bit_sorted.indexOf(d)]
    });

    return {
      bits,
      registers: [coverted.register]
    }
  } else if (raw_bits instanceof Array && raw_bits.every((bit) => isBitType(bit))) {
    let registers: BitRegister[] = [], register_names: string[] = [];
    let bits = raw_bits;
    for (const bit of bits) {
      if (!register_names.includes(bit.register.name)) {
        register_names.push(bit.register.name);
        registers.push(bit.register);
      }
    }
    return { bits, registers };
  } else {
    throw new Error("Invalid Bit spec");
  }
}

function normalizeOperationsToLayers(
  raw_operations: Operation[] | OperationLayer[],
  qubits: Bit[],
  clbits: Bit[]
): { layers: OperationLayer[], mapping: OpLayerMapping } {
  let layers: OperationLayer[] = [];
  if (raw_operations.every(layer => isLayeredOperations(layer))) {
    let mapping: OpLayerMapping = {};
    let oli = 0;
    let li = 0;
    for (const layer of raw_operations) {
      let oi = 0;
      for (const _ of layer.operations) {
        mapping[oli] = [li, oi];
        oi++;
        oli++;
      }
      li++;
    }
    return { layers, mapping };
  } else if (raw_operations.every(op => isOperation(op))) {
    return makeOperationLayers(raw_operations, qubits, clbits)
  } else {
    throw new Error("Invalid Operation Spec");
  }
}