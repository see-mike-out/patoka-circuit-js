import type { OperationNormed } from "../../../dtypes";
import type { RowMap, GatePlan, SvgGroup, SvgRect } from "../../../dtypes/internal";
import { getYH } from "../sizing";

let gate_width = 10;
let gate_name = "barrier";

export let BARRIER: GatePlan = {
  name: gate_name,
  is_custom: false,
  width: gate_width,
  plan: function (op: OperationNormed, li: number, qr: RowMap): SvgGroup {
    let plan: SvgGroup = {
      id: `layer-${li}--${gate_name}--group`,
      type: "g",
      x: 0,
      y: 0,
      width: gate_width,
      height: 0,
      elem: []
    };
    // 0. get x, y, h 
    let pos = getYH(op, qr);
    plan.y = pos.y;
    plan.height = pos.height;

    // 1. rectangle 
    let rect: SvgRect = {
      id: `layer-${li}--${gate_name}--wrap`,
      type: "rect",
      "stroke-width": 1,
      stroke: "#cccccc",
      fill: "#cccccc",
      width: gate_width,
      x: 0,
      y: 0,
      height: pos.height,
    }
    plan.elem.push(rect);

    return plan;
  }
};