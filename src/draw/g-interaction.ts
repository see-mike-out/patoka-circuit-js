import type { InteractionEnterFunction, InteractionExitFunction, InteractionMoveFunction } from "../dtypes/interaction";
import type { BitMatch, LayerMatch, SvgClickWrap, SvgGroup } from "../dtypes/internal";

function getQubitMatchEls(data: SvgGroup | SvgClickWrap): HTMLElement[] {
  let el1, el2, el3, el4;
  el1 = [
    document.querySelector(
      `#${data.data.unit_id} ${data.data.this_circuit_id} .qubit-background.qubit-${data.data.bit_index}`,
    ),
  ];
  el2 = data.data.bit_match.map((d: { selector: string, match: BitMatch }) =>
    document.querySelector(
      `#${data.data.unit_id} ${d.selector} .qubit-background.qubit-${d.match.to.index}`,
    ),
  );
  el3 = [
    document.querySelector(
      `#${data.data.unit_id} ${data.data.this_circuit_id}-sticky .qubit-background.qubit-${data.data.bit_index}`,
    ),
  ];
  el4 = data.data.bit_match.map((d: { selector: string, match: BitMatch }) =>
    document.querySelector(
      `#${data.data.unit_id} ${d.selector}-sticky .qubit-background.qubit-${d.match.to.index}`,
    ),
  );
  return [...el1, ...el2, ...el3, ...el4];
}

function getOpMatchEls(data: SvgGroup | SvgClickWrap): Array<HTMLElement[]> {
  let els = [],
    tel = [];

  els = data.data.layer_match.map((d: { selector: string, matches: LayerMatch[] }) => {
    return d.matches.map((x: LayerMatch) => {
      return x.to.matches.map((x: [number, number]) => {
        return document.querySelector(
          `#${data.data.unit_id} ${d.selector} #layer-${x[0]}--interaction-wrap`,
        );
      })
    }).flat();
  }).flat();

  els.push(
    document.querySelector(
      `#${data.data.unit_id} ${data.data.this_circuit_id} #layer-${data.data.layer_index}--interaction-wrap`,
    ),
  );

  tel = data.data.layer_match.map((d: { selector: string, matches: LayerMatch[] }) => {
    return d.matches.map((x: LayerMatch) => {
      return x.to.matches.map((x: [number, number]) => {
        return document.querySelector(
          `#${data.data.unit_id} ${d.selector} .gate-wrap.layer-${x[0]}.gate-${x[1]}`,
        );
      })
    }).flat();
  }).flat();

  tel.push(
    document.querySelector(
      `#${data.data.unit_id} ${data.data.this_circuit_id} .gate-wrap.layer-${data.data.layer_index}.gate-${data.data.operation_index}`,
    ),
  );
  return [els, tel];
}

function generateTooltipContent(tooltip_content: any): string {
  return (
    "<table>" +
    Object.keys(tooltip_content)
      .map((k) => {
        if (k === "priority") return "";
        return `<tr><th>${k}:</th><td>${tooltip_content[k]}</td></tr>`;
      })
      .join(" ") +
    "</table>"
  );
}

export function gMouseOver(e: Event, role: string | undefined, data: SvgGroup | SvgClickWrap, onMouseOver?: InteractionEnterFunction) {
  if (data.role === "qubit-group" || data.role === "qubit-node--group") {
    let els = getQubitMatchEls(data);
    els.forEach((el) => {
      if (el) {
        el.style.fill = data.data.match_color;
        el.style.fillOpacity = "0.2";
        el.style.outline = `2px solid  ${data.data.match_color}`;
      }
    });
  } else if (data.role === "gate-group") {
    let [els, tel] = getOpMatchEls(data);
    if (els) {
      els.forEach((el) => {
        if (el) {
          el.style.fill = data.data.match_color;
          el.style.fillOpacity = "0.2";
        }
      });
    }
    if (tel) {
      tel.forEach((el) => {
        if (el) el.style.outline = `2px solid  ${data.data.match_color}`;
      });
    }
  }
  if (data?.data?.tooltip_content && onMouseOver) {
    let content = generateTooltipContent(data.data.tooltip_content);
    onMouseOver(e, role, content, false, data.data.tooltip_content.priority);
  }
}

export function gMouseMove(e: Event, role: string | undefined, onMouseMove?: InteractionMoveFunction) {
  if (onMouseMove) onMouseMove(e, role);
}

export function gMouseOut(e: Event, role: string | undefined, data: SvgGroup | SvgClickWrap, onMouseOut?: InteractionExitFunction) {
  if (data.role === "qubit-group" || data.role === "qubit-node--group") {
    let els = getQubitMatchEls(data);
    els.forEach((el) => {
      if (el) {
        el.style.fill = "transparent";
        el.style.fillOpacity = "";
        el.style.outline = "";
      }
    });
  } else if (data.role === "gate-group") {
    let [els, tel] = getOpMatchEls(data);
    if (els) {
      els.forEach((el) => {
        if (el) el.style.fill = "transparent";
      });
    }
    if (tel) {
      tel.forEach((el) => {
        if (el) el.style.outline = "";
      });
    }
  }
  if (data?.data?.tooltip_content && onMouseOut) {
    onMouseOut(e, role);
  }
}

export function gClick(e: Event, role: string | undefined, data: SvgGroup | SvgClickWrap, onClick?: InteractionEnterFunction) {
  e.preventDefault();
  if (data?.data?.tooltip_content && onClick) {
    let content = generateTooltipContent(data.data.tooltip_content);
    onClick(e, role, content, true, data.data.tooltip_content.priority);
  }
}

export function gFocus(e: Event, role: string | undefined, data: SvgGroup | SvgClickWrap, onFocus?: InteractionEnterFunction) {
  e.preventDefault();
  if (data?.data?.tooltip_content && onFocus) {
    let content = generateTooltipContent(data.data.tooltip_content);
    onFocus(e, role, content, true, data.data.tooltip_content.priority);
  }
}

export function gBlur(e: Event, role: string | undefined, onBlur?: InteractionExitFunction) {
  e.preventDefault();
  if (onBlur) onBlur(e, role, true);
}