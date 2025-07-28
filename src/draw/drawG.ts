import type { InteractionSpec } from "../dtypes";
import type { SvgGroup } from "../dtypes/internal";
import { svgNamespace } from "./constants";
import { draw_svg_elem } from "./drawSvgElem";
import { gBlur, gClick, gFocus, gMouseMove, gMouseOut, gMouseOver } from "./g-interaction";

export function drawG(item: SvgGroup, is_firefox: boolean, interaction?: InteractionSpec): SVGElement {
  let elem = document.createElementNS(svgNamespace, "g");
  if (item.id) {
    elem.setAttribute("id", item.id);
  }
  if (item._class) {
    elem.setAttribute("class", item._class);
  }
  if (item.role) {
    elem.setAttribute("data-role", item.role);
  }

  let transform = item.transform ?? "";
  transform = `translate(${item.x} ${item.y}) ` + transform;
  elem.setAttribute("transform", transform);

  elem.setAttribute("width", item.width.toString());
  elem.setAttribute("height", item.height.toString());

  for (const child of item.elem) {
    let child_elem = draw_svg_elem(child, is_firefox, interaction)
    if (child_elem instanceof Array) {
      elem.append(...child_elem);
    } else if (child_elem) elem.appendChild(child_elem);
  }

  elem.addEventListener('mouseover', (e: Event) => {
    gMouseOver(e, item.role, item);
  });
  elem.addEventListener('click', (e: Event) => {
    gClick(e, item.role, item);
  });
  elem.addEventListener('focus', (e: Event) => {
    gFocus(e, item.role, item);
  });
  elem.addEventListener('mousemove', (e: Event) => {
    gMouseMove(e, item.role);
  });
  elem.addEventListener('mouseout', (e: Event) => {
    gMouseOut(e, item.role, item);
  });
  elem.addEventListener('blur', (e: Event) => {
    gBlur(e, item.role);
  });

  return elem;
}