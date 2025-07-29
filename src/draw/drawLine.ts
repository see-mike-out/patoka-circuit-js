import type { BrowserInfo } from "../dtypes";
import type { SvgLine } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawLine(item: SvgLine, _?: BrowserInfo): SVGElement {
  let elem = document.createElementNS(svgNamespace, "line");
  
  // meta
  if (item.id) {
    elem.setAttribute("id", item.id);
  }
  if (item._class) {
    elem.setAttribute("class", item._class);
  }
  if (item.role) {
    elem.setAttribute("data-role", item.role);
  }

  // sizing, position, transform
  if (item.transform) {
    elem.setAttribute("transform", item.transform);
  }

  elem.setAttribute("x1", item.x1.toString());
  elem.setAttribute("y1", item.y1.toString());
    elem.setAttribute("x2", (item.x2 ?? item.x1).toString());
    elem.setAttribute("y2", (item.y2 ?? item.y1).toString());

  // optional
  elem.setAttribute("stroke", item['stroke'] ?? "black");
  elem.setAttribute("stroke-width", (item['stroke-width'] ?? 0).toString());
  elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

  return elem;
}