import type { GateNormed } from "../../../dtypes";
import type { RowMap, GatePlan, SvgGroup, SvgLine, SvgRect, SvgX } from "../../../dtypes/internal";
import { bitWidthUnit, circuit_line_height, defualt_color } from "../constants";
import { getIpos, getYH } from "../sizing";

let gate_width = bitWidthUnit;
let gate_name = "cswap";
export let CSWAP: GatePlan = {
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

    let control = op.controls?.[0];
    if (control === undefined) {
      throw new Error("No control provided");
    }
    let targets = op.qubits;
    // 0. get x, y, h 
    let pos = getYH(op, qr);
    plan.y = pos.y;
    plan.height = pos.height;

    let control_y = getIpos(op, control, qr);
    let targets_y = targets.map((bit) => getIpos(op, bit, qr));

    let line_y_0 = Math.min(control_y, ...targets_y);
    let line_y_1 = Math.max(control_y, ...targets_y);

    // 1. line between control and target
    let line: SvgLine = {
      id: `layer-${li}--${gate_name}--connect`,
      type: "line",
      x1: gate_width / 2 - 0.5,
      x2: gate_width / 2 - 0.5,
      y1: line_y_0 + circuit_line_height / 2,
      y2: line_y_1 + circuit_line_height / 2,
      "stroke-width": 1
    };
    plan.elem.push(line);

    // 2. dot for control
    let marker: SvgRect = {
      id: `layer-${li}--${gate_name}--swap-control-marker`,
      type: "rect",
      "stroke-width": 0,
      fill: defualt_color,
      width: 6,
      height: 6,
      x: (gate_width / 2) - 3,
      y: control_y + (circuit_line_height / 2) - 3
    };
    plan.elem.push(marker);

    // 3. swap markers
    let ci = 0;
    for (let _ in targets) {
      if (ci < 1) {
      } else {
        let marker: SvgX = {
          id: `layer-${li}--${gate_name}--swap-${ci}-marker`,
          type: "x",
          cx: gate_width / 2,
          cy: targets_y[ci] + circuit_line_height / 2,
          width: bitWidthUnit / 2,
          height: bitWidthUnit / 2,
          "stroke-width": 1,
          stroke: defualt_color
        };
        plan.elem.push(marker);
      }
      ci++;
    }

    return plan;
  }
};