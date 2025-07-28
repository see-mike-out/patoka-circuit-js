import type { SvgDoubleLine } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawDoubleLine(item: SvgDoubleLine, _?: boolean): SVGElement[] {
  let gap = item["stroke-width"] !== undefined ? item["stroke-width"] : 1;
  let markers: Array<[string, number]> = [['--top', -gap / 2], ['--bottom', gap / 2]];
  let items: SVGElement[] = [];
  for (const marker of markers) {
    let elem = document.createElementNS(svgNamespace, "line");

    // meta
    if (item.id) {
      elem.setAttribute("id", item.id + marker[0]);
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
    elem.setAttribute("y1", (item.y1 + marker[1]).toString());
    elem.setAttribute("x2", (item.x2 ?? item.x1).toString());
    elem.setAttribute("y2", ((item.y2 ?? item.y1) + marker[1]).toString());

    // optional
    elem.setAttribute("stroke", item['stroke'] ?? "black");
    elem.setAttribute("stroke-width", '1');
    elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

    items.push(elem);
  }
  return items;
}