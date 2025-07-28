import type { GateNormed } from "../../../dtypes";
import type { RowMap, GatePlan, SvgGroup, SvgRect, SvgText } from "../../../dtypes/internal";
import { bitWidthUnit, circuit_h_gap, circuit_line_height, default_fill, defualt_color } from "../constants";
import { getIpos, getYH } from "../sizing";

let gate_width = bitWidthUnit * 1.4;
let gate_name = "ecr"
export let ECR: GatePlan = {
  name: gate_name,
  width: gate_width,
  is_custom: false,
  plan: function (op: GateNormed, li: number, qr: RowMap): SvgGroup {
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
    let control = op.controls?.[0];
    if (control === undefined) {
      throw new Error("No control provided");
    }
    let target = op.qubits[0];

    let pos = getYH(op, qr, true);
    plan.y = pos.y;
    plan.height = pos.height;

    let control_y = getIpos(op, control, qr, true);
    let target_y = getIpos(op, target, qr, true);

    // 1. rectangle 
    let rect: SvgRect = {
      id: `layer-${li}--${gate_name}--wrap`,
      type: "rect",
      "stroke-width": 1,
      stroke: defualt_color,
      fill: default_fill,
      width: gate_width,
      x: 0,
      y: 0,
      height: pos.height,
    }
    plan.elem.push(rect);
    // 2. start qubit
    let start_qubit: SvgText = {
      id: `layer-${li}--${gate_name}--qubit-1`,
      type: "text",
      x: circuit_h_gap / 2,
      y: control_y + circuit_line_height / 2,
      "text-anchor": "start",
      "alignment-baseline": "middle",
      text: `${control.index}▪︎`
    }
    plan.elem.push(start_qubit);
    // 3. end qubit
    let end_qubit: SvgText = {
      id: `layer-${li}--${gate_name}--qubit-2`,
      type: "text",
      x: circuit_h_gap / 2,
      y: target_y + circuit_line_height / 2,
      "text-anchor": "start",
      "alignment-baseline": "middle",
      text: `${target.index}`
    }
    plan.elem.push(end_qubit);
    // 4. marker
    let marker: SvgText = {
      id: `layer-${li}--${gate_name}--marker`,
      type: "text",
      x: gate_width - circuit_h_gap / 2,
      y: pos.height / 2,
      "text-anchor": "end",
      "alignment-baseline": "middle",
      text: "ECR"
    }
    plan.elem.push(marker);

    return plan;
  }
};