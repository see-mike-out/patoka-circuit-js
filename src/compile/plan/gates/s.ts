import type { OperationNormed } from "../../../dtypes";
import type { RowMap, GatePlan, SvgGroup, SvgRect, SvgText } from "../../../dtypes/internal";
import { bitWidthUnit, default_fill, defualt_color } from "../constants";
import { getYH } from "../sizing";

let gate_width = bitWidthUnit;
let gate_name = "s";
export let S: GatePlan = {
  name: gate_name,
  width: gate_width,
  is_custom: false,
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
      text: gate_name.toUpperCase()
    }
    plan.elem.push(marker);

    return plan;
  }
};