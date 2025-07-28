import type { Bit, BitRegister } from "./bits";
import type { CompileOptions } from "./compile-options";
import type { OperationLayer, OpLayerMapping } from "./op";
import type { InteractionSpec, MatchSpec } from "./spec";

export type NormedData = {
  qubits: Bit[]
  qubit_registers: BitRegister[];
  num_qubits: number;
  num_total_qubits: number;
  clbits: Bit[];
  num_clbits: number;
  clbit_registers: BitRegister[];
  layers: OperationLayer[]
  operation_mapping: OpLayerMapping
};

export type PreparedData = NormedData & {
  selector: string;
  global_phase?: number | string;
  options?: CompileOptions;
  match_data?: MatchSpec[];
  interaction?: InteractionSpec;
}