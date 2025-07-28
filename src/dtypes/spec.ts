import type { Bit } from "./bits";
import type { CompileOptions } from "./compile-options";
import type { InteractionEnterFunction, InteractionExitFunction, InteractionMoveFunction } from "./interaction";
import type { MatchData } from "./internal";
import type { Operation, OperationLayer } from "./op";

export type InputSpec = {
  selector: string;

  qubits: number | number[] | Bit[]; // qubits
  clbits: number | number[] | Bit[]; // clasicall bits
  operations: OperationLayer[] | Operation[];

  globalPhase?: number | string;
  options?: CompileOptions;
  matchData?: MatchSpec[];
  interaction?: InteractionSpec;
};

export type MatchSpec = {
  selector: string,
  data: MatchData
};

export type InteractionSpec = {
  onMouseOver?: InteractionEnterFunction,
  onClick?: InteractionEnterFunction,
  onFocus?: InteractionEnterFunction,
  onMouseMove?: InteractionMoveFunction,
  onMouseOut?: InteractionExitFunction,
  onBlur?: InteractionExitFunction
};