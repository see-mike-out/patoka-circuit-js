import type { BrowserInfo } from "../dtypes";
import type { SvgCircle } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawCircle(item: SvgCircle, _?: BrowserInfo): SVGElement {
  let elem = document.createElementNS(svgNamespace, "circle");
  
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

  elem.setAttribute("cx", item.cx.toString());
  elem.setAttribute("cy", item.cy.toString());
  elem.setAttribute("r", item.r.toString());

  // optional
  elem.setAttribute("fill", item.fill ?? "#ffffff");
  elem.setAttribute("fill-opacity", (item['fill-opacity'] ?? 1).toString());
  elem.setAttribute("stroke", item['stroke'] ?? "black");
  elem.setAttribute("stroke-width", (item['stroke-width'] ?? 0).toString());
  elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

  return elem;
}