import type { GateNormed } from "../../../dtypes";
import type { RowMap, GatePlan, SvgGroup, SvgRect, SvgText } from "../../../dtypes/internal";
import { bitWidthUnit, default_fill, defualt_color } from "../constants";
import { getYH } from "../sizing";
import { get_radian_names } from "../util";

let gate_width = bitWidthUnit * 2.3;
let gate_name = "rx"
export let RX: GatePlan = {
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
    let pos = getYH(op, qr);
    plan.y = pos.y;
    plan.height = pos.height;

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
      height: pos.height
    }
    plan.elem.push(rect);
    // 4. marker
    let marker: SvgText = {
      id: `layer-${li}--${gate_name}--marker`,
      type: "text",
      x: gate_width / 2,
      y: pos.height / 2,
      "text-anchor": "middle",
      "alignment-baseline": "middle",
      text: `Rx(${get_radian_names(op.params?.[0])})`
    }
    plan.elem.push(marker);

    return plan;
  }
};