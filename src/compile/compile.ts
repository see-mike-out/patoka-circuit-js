import type { PreparedData } from "../dtypes/normed-spec";
import { normalizeMatches } from "./normalize-match";
import { planDrawing } from "./plan/plan_draw";

export function compileSpec(
  spec: PreparedData,
  data_to_match: { [key: string]: PreparedData }
) {
  // normalize
  let {
    selector,
    qubits,
    num_qubits,
    num_total_qubits,
    qubit_registers,
    clbits,
    num_clbits,
    clbit_registers,
    layers,
    operation_mapping,
    global_phase,
    options,
    match_data,
    interaction
  } = spec;

  // normalize mapping
  let match_normed = match_data ? normalizeMatches(
    match_data,
    operation_mapping,
    qubits,
    clbits,
    data_to_match
  ) : null;

  // drawing
  let draw_plan = planDrawing({
    selector,
    qubits,
    num_qubits,
    num_total_qubits,
    qubit_registers,
    clbits,
    num_clbits,
    clbit_registers,
    layers,
    global_phase,
    interaction
  },
    match_normed,
    options,
  );

  return {
    draw_plan,
    match_normed,
    interaction
  }
}

