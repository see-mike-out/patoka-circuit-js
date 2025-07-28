import { compileSpec } from "../compile";
import type { PreparedData } from "../dtypes";
import { svgNamespace } from "./constants";
import { draw_svg_elem } from "./drawSvgElem";
// @ts-ignore
import classes from '../style.module.css';
// @ts-ignore
import classes_raw from '../style.module.css?inline';

export function runEcho(
  spec: PreparedData,
  data_to_match: { [key: string]: PreparedData }
) {
  let compiled = compileSpec(spec, data_to_match);
  let is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  let draw_plan = compiled.draw_plan;
  let interaction = compiled.interaction;

  if (draw_plan) {
    let main_selector: string = (draw_plan?.unit_id ? "#" + draw_plan?.unit_id + " " : "") + draw_plan.selector;
    let wrapper = document.querySelector(main_selector);
    if (!wrapper) {
      throw new Error("Selector not found: " + main_selector)
    }
    let svg = document.createElementNS(svgNamespace, "svg");
    svg.classList.add(classes['echo-vis'] as string);
    svg.setAttribute("width", draw_plan.width.toString());
    svg.setAttribute("height", draw_plan.height.toString());
    svg.setAttribute("viewBox", draw_plan.viewBox.join(" "));

    // add css
    let defs = document.createElementNS(svgNamespace, "defs");
    let style = document.createElementNS(svgNamespace, "style");
    style.setAttribute("type", "text/css");
    style.innerHTML = classes_raw;
    defs.appendChild(style);
    svg.appendChild(defs);

    for (let group_key in draw_plan.groups) {
      const group = draw_plan.groups[group_key];
      if (group) {
        let items = draw_svg_elem(group, is_firefox, interaction)
        if (items instanceof Array) {
          svg.append(...items);
        } else if (items) {
          svg.appendChild(items);
        }
      }
    }

    wrapper.appendChild(svg);
    return svg;
  }
}