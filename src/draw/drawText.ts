import type { BrowserInfo } from "../dtypes";
import type { SvgText } from "../dtypes/internal";
import { svgNamespace } from "./constants";

export function drawText(item: SvgText, browser_info: BrowserInfo): SVGElement {
  let elem = document.createElementNS(svgNamespace, "text");

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
  elem.setAttribute("x", item.x.toString());
  elem.setAttribute("y", item.y.toString());

  // optional
  elem.setAttribute("fill", item.fill ?? "#000000");
  elem.setAttribute("fill-opacity", (item['fill-opacity'] ?? 1).toString());
  elem.setAttribute("stroke", item['stroke'] ?? "black");
  elem.setAttribute("stroke-width", (item['stroke-width'] ?? 0).toString());
  elem.setAttribute("stroke-opacity", (item['stroke-opacity'] ?? 1).toString());

  // text
  elem.innerHTML = item.text;
  let font_size = item['font-size'] ?? 12
  elem.setAttribute("font-size", font_size.toString());
  if (item['text-anchor']) {
    elem.setAttribute("text-anchor", item['text-anchor']);
  }
  if (item['font-weight']) {
    elem.setAttribute("font-weight", item['font-weight']?.toString());
  }
  if (item['font-style']) {
    elem.setAttribute("font-style", item['font-style']?.toString());
  }
  if (item['alignment-baseline']) {
    elem.setAttribute("alignment-baseline", item['alignment-baseline']);
  }
  if (item['alignment-baseline'] === "middle" && browser_info.is_firefox) {
    elem.setAttribute("y", (item.y + font_size / 2).toString());
  } else if (item['alignment-baseline'] === "baseline" && browser_info.is_firefox) {
    elem.setAttribute("y", (item.y + font_size).toString());
  }

  return elem;
}