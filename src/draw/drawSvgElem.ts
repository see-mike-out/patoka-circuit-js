import type { InteractionSpec } from "../dtypes";
import type { SvgElem } from "../dtypes/internal";
import { drawCircle } from "./drawCircle";
import { drawClickWrap } from "./drawClickWrap";
import { drawDoubleLine } from "./drawDoubleLine";
import { drawG } from "./drawG";
import { drawLine } from "./drawLine";
import { drawPath } from "./drawPath";
import { drawRect } from "./drawRect";
import { drawText } from "./drawText";
import { drawX } from "./drawX";

export function draw_svg_elem(item: SvgElem, is_firefox: boolean, interaction?: InteractionSpec): SVGElement | SVGElement[] | null {
  switch (item.type) {
    case 'g':
      return drawG(item, is_firefox, interaction);
    case 'text':
      return drawText(item, is_firefox);
    case 'rect':
      return drawRect(item, is_firefox);
    case 'click-wrap':
      return drawClickWrap(item, is_firefox, interaction);
    case 'line':
      return drawLine(item, is_firefox);
    case 'double-line':
      return drawDoubleLine(item, is_firefox);
    case 'x':
      return drawX(item, is_firefox);
    case 'circle':
      return drawCircle(item, is_firefox);
    case 'path':
      return drawPath(item, is_firefox);
  }
  return null;
}