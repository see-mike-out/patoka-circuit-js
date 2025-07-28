import type { InputSpec } from "../dtypes";
import type { PreparedData } from "../dtypes/normed-spec";
import { normalizeSpec } from "./normalize";

export function prepareData(spec: InputSpec): PreparedData {
  // normalize
  let raw_qubits = spec.qubits,
    raw_clbits = spec.clbits,
    raw_operations = spec.operations;
  
  return {
    ...normalizeSpec(raw_qubits, raw_clbits, raw_operations),
    selector: spec.selector,
    global_phase: spec.globalPhase ?? undefined,
    options: spec.options ?? undefined,
    match_data: spec.matchData,
    interaction: spec.interaction,
  };
}