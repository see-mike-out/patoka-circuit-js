import type { GateNormed, OperationNormed } from "../../../dtypes";
import type { RowMap, SvgGroup, SvgRect, SvgText, CustomGatePlan } from "../../../dtypes/internal";
import { bitWidthUnit, circuit_h_gap, circuit_line_height, default_fill, defualt_color } from "../constants";
import { getYH } from "../sizing";

let gate_width = bitWidthUnit * 1.65;
let _gate_name = "custom"
export let CUSTOM: CustomGatePlan = {
  name: _gate_name,
  is_custom: true,
  width: gate_width,
  plan: function (op: OperationNormed, gate_name: string, li: number, qr: RowMap): SvgGroup {
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
      height: pos.height,
    }
    plan.elem.push(rect);
    // 2. qubit markers
    let qi = 0;
    for (const qb of op.qubits) {
      let t_pos = getYH({
        name: gate_name,
        qubits: [qb],
        num_qubits: 1,
        num_clbits: 0,
        clbits: [],
        params: [],
        is_custom: true
      } as GateNormed);
      let qubit_obj: SvgText = {
        id: `layer-${li}--${gate_name}--qubit-${qi}`,
        type: "text",
        x: circuit_h_gap / 2,
        y: t_pos.y + circuit_line_height / 2,
        "text-anchor": "start",
        "alignment-baseline": "middle",
        text: `${qb?.index}`
      }
      plan.elem.push(qubit_obj);
      qi++;
    }

    // 3. marker
    let marker: SvgText = {
      id: `layer-${li}--${gate_name}--marker`,
      type: "text",
      x: gate_width - circuit_h_gap / 2,
      y: pos.height / 2,
      "text-anchor": "end",
      "alignment-baseline": "middle",
      text: gate_name.toUpperCase()
    }
    plan.elem.push(marker);

    return plan;
  }
};