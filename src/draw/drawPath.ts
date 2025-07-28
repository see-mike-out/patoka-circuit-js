import type { SvgPath } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawPath(item: SvgPath, _?: boolean): SVGElement {
  let elem = document.createElementNS(svgNamespace, "path");

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

  elem.setAttribute("d", item.path.toString());

  // optional
  elem.setAttribute("fill", item.fill ?? "#ffffff");
  elem.setAttribute("fill-opacity", (item['fill-opacity'] ?? 1).toString());
  elem.setAttribute("stroke", item['stroke'] ?? "black");
  elem.setAttribute("stroke-width", (item['stroke-width'] ?? 0).toString());
  elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

  return elem;
}