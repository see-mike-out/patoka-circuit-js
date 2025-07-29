import type { BrowserInfo, InteractionSpec } from "../dtypes";
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

export function draw_svg_elem(item: SvgElem, browser_info: BrowserInfo, interaction?: InteractionSpec): SVGElement | SVGElement[] | null {
  if (!item.data) item.data = {};
  item.data.browser_info = browser_info;
  switch (item.type) {
    case 'g':
      return drawG(item, browser_info, interaction);
    case 'text':
      return drawText(item, browser_info);
    case 'rect':
      return drawRect(item, browser_info);
    case 'click-wrap':
      return drawClickWrap(item, browser_info, interaction);
    case 'line':
      return drawLine(item, browser_info);
    case 'double-line':
      return drawDoubleLine(item, browser_info);
    case 'x':
      return drawX(item, browser_info);
    case 'circle':
      return drawCircle(item, browser_info);
    case 'path':
      return drawPath(item, browser_info);
  }
  return null;
}