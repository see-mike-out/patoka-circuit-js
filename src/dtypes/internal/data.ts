import type { Bit, BitRegister } from "../bits";
import type { OperationLayer } from "../op";
import type { InteractionSpec } from "../spec";

export type CircuitDrawingData = {
  selector: string,
  layers: OperationLayer[],
  qubits: Bit[],
  num_qubits: number,
  num_total_qubits: number,
  qubit_registers: BitRegister[],
  clbits: Bit[],
  num_clbits: number,
  clbit_registers: BitRegister[],
  global_phase?: number | string,
  interaction?: InteractionSpec
};

export type RowMap = { [key: number]: number };

export type ImageLoader = {
  png: string,
  id: string,
  svg: string
};