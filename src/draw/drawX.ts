import type { SvgX } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawX(item: SvgX, _?: boolean): SVGElement[] {
  let markers: Array<[string, [number, number], [number, number], string]> = [
    ['--0', [item.cx, item.cx + item.width], [item.cy, item.cy + item.height], `translate(-${item.width / 2}, -${item.height / 2})`],
    ['--1', [item.cx + item.width, item.cx], [item.cy, item.cy + item.height], `translate(-${item.width / 2}, -${item.height / 2})`]
  ];
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
    let transform = marker[3] + (item.transform ? (" " + item.transform) : "");
    elem.setAttribute("transform", transform);

    elem.setAttribute("x1", marker[1][0].toString());
    elem.setAttribute("y1", marker[2][0].toString());
    elem.setAttribute("x2", marker[1][1].toString());
    elem.setAttribute("y2", marker[2][1].toString());

    // optional
    elem.setAttribute("stroke", item['stroke'] ?? "black");
    elem.setAttribute("stroke-width", '1');
    elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

    items.push(elem);
  }
  return items;
}