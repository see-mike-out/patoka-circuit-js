import type { SvgRect } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawRect(item: SvgRect, _?: boolean): SVGElement {
  let elem = document.createElementNS(svgNamespace, "rect");
  
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

  elem.setAttribute("width", item.width.toString());
  elem.setAttribute("height", item.height.toString());
  elem.setAttribute("x", item.x.toString());
  elem.setAttribute("y", item.y.toString());

  // optional
  elem.setAttribute("fill", item.fill ?? "#ffffff");
  elem.setAttribute("fill-opacity", (item['fill-opacity'] ?? 1).toString());
  elem.setAttribute("stroke", item['stroke'] ?? "black");
  elem.setAttribute("stroke-width", (item['stroke-width'] ?? 0).toString());
  elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

  return elem;
}