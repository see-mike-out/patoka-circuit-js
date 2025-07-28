import type { OperationNormed } from "../op"
import type { RowMap } from "./data"
import type { SvgGroup } from "./svg"

export type GatePlan = {
  name: string,
  is_custom: false,
  width: number,
  plan: (op: OperationNormed, li: number, qr: RowMap) => SvgGroup
}

export type CustomGatePlan = {
  name: string,
  is_custom: true,
  width: number,
  plan: (op: OperationNormed, gate_name: string, li: number, qr: RowMap) => SvgGroup
}