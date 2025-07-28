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

    let text_length = gate_name.toUpperCase().length;
    plan.width = Math.max(gate_width,
      text_length * 0.75 * 9 + 10
    );
    // 1. rectangle 
    let rect: SvgRect = {
      id: `layer-${li}--${gate_name}--wrap`,
      type: "rect",
      "stroke-width": 1,
      stroke: defualt_color,
      fill: default_fill,
      width: plan.width,
      x: 0,
      y: 0,
      height: pos.height,
    }
    plan.elem.push(rect);
    // 2. qubit markers
    let qi = 0;
    for (const qb of op.qubits) {
      let t_pos = getYH({
        is_custom: true,
        name: gate_name,
        qubits: [qb],
        num_qubits: 1,
        num_clbits: 0,
        clbits: [],
        params: []
      } as GateNormed);
      let qubit_obj: SvgText = {
        id: `layer-${li}--${gate_name}--qubit-${qi}`,
        type: "text",
        x: circuit_h_gap / 2,
        y: t_pos.y + circuit_line_height / 2 - pos.y,
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
      x: plan.width - circuit_h_gap / 2,
      y: pos.height / 2,
      "text-anchor": "end",
      "alignment-baseline": "middle",
      text: gate_name.toUpperCase()
    }
    plan.elem.push(marker);

    return plan;
  }
};