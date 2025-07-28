import type { InteractionSpec } from "../dtypes";
import type { SvgClickWrap } from "../dtypes/internal";
import { svgNamespace } from "./constants";
import { gBlur, gClick, gFocus, gMouseMove, gMouseOut, gMouseOver } from "./g-interaction";

export function drawClickWrap(item: SvgClickWrap, _?: boolean, interaction?: InteractionSpec): SVGElement {
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
  elem.setAttribute("fill", "transparent");
  elem.setAttribute("stroke-width", "0");

  elem.addEventListener('mouseover', (e: Event) => {
    gMouseOver(e, item.role, item, interaction?.onMouseOver);
  });
  elem.addEventListener('click', (e: Event) => {
    gClick(e, item.role, item, interaction?.onClick);
  });
  elem.addEventListener('focus', (e: Event) => {
    gFocus(e, item.role, item, interaction?.onFocus);
  });
  elem.addEventListener('mousemove', (e: Event) => {
    gMouseMove(e, item.role, interaction?.onMouseMove);
  });
  elem.addEventListener('mouseout', (e: Event) => {
    gMouseOut(e, item.role, item, interaction?.onMouseOut);
  });
  elem.addEventListener('blur', (e: Event) => {
    gBlur(e, item.role, interaction?.onBlur);
  });

  return elem;
}