import { planGateDrawing } from "./plan_gate";
import { circuit_line_height, circuit_v_gap, circuit_h_gap, qubit_ref_width, padding, moment_bar_height, ord_colors } from "./constants"
import { get_radian_names } from "./util";
import type { Bit, CompileOptions, Pagination } from "../../dtypes";
import type { CircuitDrawingData, MatchDataNormed, RowMap, SvgClickWrap, SvgDoubleLine, SvgElem, SvgGroup, SvgLineElem, SvgPlan, SvgRect, SvgText, SvgWrapperElem } from "../../dtypes/internal";
import { bitToString } from "../bit-register";
import { array_match } from "../../utils/array";


function hasMatch(match_data: any): match_data is MatchDataNormed[] {
  return match_data !== undefined && match_data !== null;
}

export function planDrawing(data: CircuitDrawingData, match_data: MatchDataNormed[] | null, config?: CompileOptions) {
  if (!data) return null;

  // define overall sizing
  let width: number = 0,
    height: number = 0,
    body_height: number = 0,
    qubits: SvgElem[] = [],
    circuit_lines: SvgLineElem[] = [];

  let pagination: Pagination | undefined = config?.pagination;
  let starting_index: number = config?.pagination?.range[0] || 0;
  let circuit_names = config?.circuitSelectorName;

  let has_match = hasMatch(match_data);
  let match_selectors = has_match ? match_data?.map((d) => d.selector) : null;
  let is_original = config?.isOriginal ?? true;
  let filter_unused_qubits: boolean = config?.filterUnusedQubits ?? true;
  let qubit_area_width: number = qubit_ref_width;

  // qubit filtering
  let qubits_to_draw: number[] = data.qubits.map((d) => d.index),
    n_qubits_to_draw: number = qubits_to_draw.length;

  if (filter_unused_qubits) {
    let qubits_in_layers: string[] = data.layers.map((layer) => layer.operations.map(op => op.qubits.map(q => bitToString(q))).flat()).flat();
    qubits_to_draw = data.qubits.filter((q) => qubits_in_layers.includes(bitToString(q))).map(d => d.index);
    n_qubits_to_draw = qubits_to_draw.length;
  }

  // qubit column
  let q_row_i = 0, qubit_row_map: RowMap = {};
  if (n_qubits_to_draw > 0) {
    let texts: string[] = []
    for (let qubit of data.qubits) {
      let text = (qubit.is_ancilla ? 'ancilla' : qubit.register.name) + "/" + qubit.index;
      texts.push(text);
    }
    let max_text_length = Math.max(...texts.map(t => t.length));
    qubit_area_width = max_text_length * 0.5 * 12;
    let ti = 0;
    for (let qubit of data.qubits) {
      if (filter_unused_qubits && !qubits_to_draw.includes(qubit.index)) continue;
      else {
        qubit_row_map[qubit.index] = q_row_i;

        let bit_match;
        if (hasMatch(match_data)) {
          bit_match = match_data.map((d: MatchDataNormed) => { return { selector: d.selector, match: d.data.bit.filter((q) => q.from?.index == qubit.index)[0] } });
        }
        let match_color: string = ord_colors[q_row_i || data.qubits.length]


        let qubit_group: SvgGroup = {
          type: "g",
          x: 0,
          y: (circuit_line_height + circuit_v_gap) * q_row_i,
          width: qubit_area_width,
          height: circuit_line_height,
          role: "qubit-group",
          id: `qubit-${qubit.index}--group`,
          _class: `qubit-group qubit-${qubit.index}` + (is_original ? " original" : " non_original"),
          data: {
            qubit,
            bit_index: qubit.index,
            bit_match,
            matched_circuit_id: match_selectors,
            unit_id: config?.unitId ?? '',
            this_circuit_id: data.selector,
            match_color
          },
          elem: []
        }

        qubit_group.elem.push({
          type: "rect",
          x: 0,
          y: 0,
          width: qubit_area_width,
          height: circuit_line_height,
          role: "qubit-background",
          "fill-opacity": 0.2,
          "stroke": "transparent",
          _class: `qubit-background qubit-${qubit.index}` + (config?.isOriginal ? " original" : " non_original")
        } as SvgRect);

        qubit_group.elem.push({
          type: "text",
          text: texts[ti],
          "text-anchor": "end",
          "alignment-baseline": "middle",
          x: qubit_area_width,
          y: circuit_line_height / 2,
          width: qubit_area_width,
          height: circuit_line_height,
          role: "qubit",
          _class: `qubit qubit-${qubit.index}` + (config?.isOriginal ? " original" : " non_original"),
        } as SvgText);

        qubit_group.elem.push({
          type: "click-wrap",
          x: 0,
          y: 0,
          width: qubit_area_width,
          height: circuit_line_height,
          role: "qubit-group-click-wrap",
          data: {
            qubit,
            bit_match,
            matched_circuit_id: match_selectors,
            unit_id: config?.unitId ?? '',
            this_circuit_id: data.selector,
            match_color
          },
        } as SvgClickWrap);

        qubits.push(qubit_group);

        circuit_lines.push({
          type: "line",
          x1: 0,
          y1: q_row_i * (circuit_line_height + circuit_v_gap) + circuit_line_height / 2 - 0.5,
          x2: -1,
          y2: -1,
          "stroke-width": 1
        });

        q_row_i += 1;
        ti++;
      }
    }
    width += qubit_area_width;
    body_height = circuit_line_height * n_qubits_to_draw + circuit_v_gap * (n_qubits_to_draw - 1);
    height += body_height;
  }

  // global phase
  let phase_marker!: SvgGroup;
  if (data.global_phase) {
    let phase_text = `Global phase: ${get_radian_names(data.global_phase)}`;
    phase_marker = {
      type: "g",
      x: padding,
      y: padding,
      role: "global-phase",
      id: `global-phase`,
      elem: [],
      width: phase_text.length * 8,
      height: 10
    }
    phase_marker.elem.push({
      type: "text",
      x: qubit_area_width,
      y: moment_bar_height,
      role: "global-phase--marker",
      id: "global-phase--marker",
      "text-anchor": "end",
      "font-size": 10,
      text: phase_text
    } as SvgText);
  }


  // clibt row
  if (data.num_clbits > 0) {
    height += circuit_line_height + circuit_v_gap * 2;
    qubits.push({
      type: "text",
      text: "C/" + data.num_clbits,
      "text-anchor": "end",
      "alignment-baseline": "middle",
      x: qubit_area_width,
      y: body_height + circuit_v_gap + circuit_line_height / 2,
      width: qubit_area_width,
      height: circuit_line_height,
      role: "clbit",
      data: data.clbits
    } as SvgText);

    qubits.push({
      type: "click-wrap",
      x: 0,
      y: body_height + circuit_v_gap,
      width: qubit_area_width,
      height: circuit_line_height,
      role: "qubit-group-click-wrap",
      data: data.clbits
    } as SvgClickWrap);
    circuit_lines.push({
      type: "double-line",
      x1: 0,
      y1: body_height + circuit_v_gap + circuit_line_height / 2 - 2,
      x2: -1,
      y2: -1,
      "stroke-width": 4
    } as SvgDoubleLine);
  }

  // circuit body (gates)
  let circuit_width = 0;
  let circuit_body: SvgGroup[] = [];
  let prev_x = circuit_h_gap;

  // per layer
  let page_start = pagination?.range?.[0] ? Math.max(pagination?.range?.[0], 0) : 0,
    page_end = pagination?.range?.[1] ? Math.min(pagination?.range?.[1], data.layers.length) : data.layers.length;
  let oix = 0;
  for (let i = 0; i < data.layers.length; i++) {
    if (i < page_start || i >= page_end) continue;
    let layer = data.layers[i];
    let layer_group: SvgGroup = {
      id: `layer-${starting_index + i}--group`,
      type: "g",
      role: "layer-group",
      _class: `layer-wrap layer-${starting_index + i}` + (config?.isOriginal ? " original" : " non_original"),
      x: prev_x,
      y: 0,
      width: 0,
      height,
      elem: [],
      data: {
        layer,
        layer_index: starting_index + i,
        tooltip_content: {
          "Layer": i,
          "# Operations": layer.operations.length,
          "Qubits": ""
        }
      }
    };

    // per gate
    let layer_width = 0, layer_qubits: number[] = [];
    for (let j = 0; j < layer.operations.length; j++) {
      let op = layer.operations[j]
      let op_plan: SvgGroup = planGateDrawing(op, starting_index + i, qubit_row_map);

      // layer match
      let match_color;
      if (hasMatch(match_data)) {
        match_color = ord_colors[oix % ord_colors.length];
      }

      if (op_plan) {
        op_plan._class = `gate-wrap layer-${starting_index + i} gate-${j}` + (config?.isOriginal ? " original" : " non_original");
        op_plan.data.operation_index = j;
        op_plan.data.layer_match = match_data?.map((match_item) => {
          return {
            selector: match_item.selector,
            matches: match_item.data.layer.filter((l) => l.from[0] == i && l.from[1] == j)
          };
        });
        op_plan.data.match_color = match_color;
        op_plan.data.matched_circuit_id = match_selectors;
        op_plan.data.unit_id = config?.unitId;
        op_plan.data.this_circuit_id = data.selector;
        op_plan.data.operation_index = j;
        op_plan.data.tooltip_content = {
          "Index": `${i}.${j}`,
          "Name": op.name,
          "Qubit(s)": [...('controls' in op && op.controls ? op.controls : []), ...op.qubits].map((d: Bit) => d.index).join(", "),
        }

        if (hasMatch(match_data)) {
          op_plan.data.tooltip_content['Match'] = op_plan.data.layer_match.map((d: any) => {
            return `${circuit_names?.[d.selector] ?? d.selector}: ${d.matches.map((p: any) => p.to.matches.map((k: [number, number]) => k.join("."))).join(", ")}`
          }).join("<br/>")
        }
        if ('params' in op && op.params) {
          op_plan.data.tooltip_content['Params'] = op.params.map(d => get_radian_names(d)).join(", ")
        }

        op_plan.elem.push({
          id: `layer-${starting_index + i}--${op.name}--click-wrap`,
          _class: `gate-group-click-wrap`,
          role: `gate-group-click-wrap`,
          type: "click-wrap",
          x: 0,
          y: 0,
          width: op_plan.width,
          height: op_plan.height,
          data: op_plan.data
        } as SvgClickWrap)
      }

      oix++;
      layer_group.elem.push(op_plan);
      layer_width = Math.max(layer_width, op_plan?.width || 32);

      op.qubits.forEach(q => { if (!layer_qubits.includes(q.index)) layer_qubits.push(q.index) });
    }
    layer_group.width = layer_width;
    layer_group.data.tooltip_content["Qubits"] = "[" + layer_qubits.join(", ") + "]";
    (layer_group.elem as SvgWrapperElem[]).forEach((el) => {
      if (el && el.width !== undefined && el.width < layer_width) {
        el.x += (layer_width - el.width) / 2
      }
    });

    // add interaction wrap
    layer_group.elem.unshift({
      id: `layer-${starting_index + i}--interaction-wrap`,
      _class: "interation-wrap",
      type: "rect",
      x: - (circuit_h_gap / 2),
      y: config?.showMoments ? (- moment_bar_height - circuit_v_gap - padding) : -padding,
      width: layer_width + circuit_h_gap,
      height: config?.showMoments ? height + moment_bar_height + circuit_v_gap + padding * 2 : height + padding * 2,
      fill: "rgba(0, 0, 0, 0)",
      stroke: "transparent"
    });

    prev_x = prev_x + layer_width + circuit_h_gap;
    circuit_width = circuit_width + layer_width + circuit_h_gap
    circuit_body.push(layer_group);
  }

  // update sizing
  circuit_width = circuit_width + circuit_h_gap;
  width += circuit_width + circuit_h_gap;

  // update circuit line pos
  circuit_lines.forEach((line) => {
    line.x2 = circuit_width;
    line.y2 = line.y1;
  });

  let final_plan: SvgPlan = {
    selector: data.selector,
    type: "svg",
    width: width + padding * 2,
    height: height + padding * 2,
    viewBox: [0, 0, width + padding * 2, height + padding * 2],
    groups: {
      qubit_group: {
        id: `qubits--group`,
        type: "g",
        x: padding,
        y: padding,
        width: qubit_area_width,
        height,
        elem: qubits,
        role: "qubits",
        data: {
          qubits: data.qubits,
          clbits: data.clbits,
          num_qubits: data.num_qubits,
          num_clbits: data.num_clbits
        }
      },
      circuit_line_group: {
        id: `circuit-line--group`,
        type: "g",
        x: padding + qubit_area_width + circuit_h_gap,
        y: padding,
        width: circuit_width,
        height,
        elem: circuit_lines,
        role: "circuit_lines"
      },
      circuit_group: {
        id: `circuit-body--group`,
        type: "g",
        x: padding + qubit_area_width + circuit_h_gap,
        y: padding,
        width: circuit_width,
        height,
        elem: circuit_body,
        role: "circuit_body",
        data: data.layers
      },
      phase_marker
    }
  }

  //---------- conditionals

  // show moments
  if (config?.showMoments) {
    let moment_group: SvgGroup = {
      id: `moment--group`,
      type: "g",
      x: padding + qubit_area_width + circuit_h_gap,
      y: padding,
      width: circuit_width,
      height: moment_bar_height,
      elem: []
    };

    moment_group.elem = circuit_body.map((m) => {
      return {
        id: `moment-${m.data.layer_index}--marker`,
        type: "text",
        text: m.data.layer_index,
        x: m.x + (m.width ?? 0) / 2,
        y: moment_bar_height / 2,
        "font-size": 10,
        data: m.data,
        "text-anchor": "middle",
        "alignment-baseline": "middle",
      };
    }) as SvgText[];

    let y_increment = moment_bar_height + circuit_v_gap;
    final_plan.height += y_increment;
    final_plan.viewBox[3] += y_increment;
    final_plan.groups.qubit_group.y += y_increment;
    final_plan.groups.circuit_line_group.y += y_increment;
    final_plan.groups.circuit_group.y += y_increment;
    if (final_plan.groups.esp_group) final_plan.groups.esp_group.y += y_increment;
    if (final_plan.groups.esp_axis_group) final_plan.groups.esp_axis_group.y += y_increment;

    final_plan.groups.moment_group = moment_group;
  }

  if (config?.unitId) {
    final_plan.unit_id = config.unitId;
  }

  return final_plan;
}

export function get_original_layer(
  match: MatchDataNormed[], // 
  dir: 'n-o' | 'o-n', // direction "n-o": non_original to original, "o-n": original to non_original
  li: number, // layer index
  oi: number // operation index
) {
  if (!match) return undefined;
  if (dir === "o-n") {
    // origintal to transpiled
    let mathced_to = match.map((item) => {
      let selector = item.selector;
      let layer_match = item.data.layer;
      let searched = layer_match.filter((d) => d.from[0] == li && d.from[1] == oi)[0]
      if (searched) {
        return {
          selector,
          layer: searched.from[0],
          operation: searched.from[1],
          matches: searched.to.matches,
          complete: searched.to.complete
        };
      } else {
        return null;
      }
    });
    return mathced_to;
  } else if (dir === "n-o") {
    let mathced_to = match.map((item) => {
      let selector = item.selector;
      let layer_match = item.data.layer;
      let searched = layer_match.filter((d) => d.from[0] == li && d.from[1] == oi)[0]

      let colleagues = layer_match.filter(
        (d) => array_match(searched.to.matches, d.to.matches)
      ).map((d) => d.from);
      if (searched) {
        return {
          selector,
          layer: searched.from[0],
          operation: searched.from[1],
          matches: searched.to.matches,
          colleagues,
          complete: searched.to.complete
        };
      } else {
        return null;
      }
    });
    return mathced_to;
  }
  return null;
}