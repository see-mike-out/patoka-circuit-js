import type { GateNormed } from "../../../dtypes";
import type { GatePlan, RowMap, SvgGroup, SvgLine, SvgRect } from "../../../dtypes/internal";
import { bitWidthUnit, circuit_line_height, defualt_color } from "../constants";
import { getIpos, getYH } from "../sizing";

let gate_width = bitWidthUnit;
let gate_name = "ccz";
export let CCZ: GatePlan = {
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
    let controls = op.controls;
    if (controls === undefined) {
      throw new Error("No control provided");
    }
    // 0. get x, y, h 
    let pos = getYH(op, qr);
    plan.y = pos.y;
    plan.height = pos.height;

    let controls_y = controls.map((d) => (getIpos(op, d, qr)));
    let line_y_0 = Math.min(...controls_y);
    let line_y_1 = Math.max(...controls_y)

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
    let ci = 0;
    for (let _ in controls) {
      let control_rect: SvgRect = {
        id: `layer-${li}--${gate_name}--control` + ci,
        type: "rect",
        "stroke-width": 0,
        fill: defualt_color,
        width: 6,
        height: 6,
        x: (gate_width / 2) - 3,
        y: controls_y[ci] + (circuit_line_height / 2) - 3
      };
      plan.elem.push(control_rect);
      ci++;
    }

    return plan;
  }
};