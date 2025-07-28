// @ts-ignore
import classes from '../style.module.css';

export function makeTooltip(e: MouseEvent, content: string, unit_id?: string) {
  if (unit_id && !document.querySelector(`#${unit_id}`)) {
    throw new Error("unit not found: " + unit_id);
  }
  let tooltip_x = e.clientX + 15;
  let tooltip_y = e.clientY + 15;

  let selector = unit_id ? `#${unit_id} .${classes['echo-vis-tooltip']}` : `.${classes['echo-vis-tooltip']}`;
  let tooltipBox: HTMLElement | null = document.querySelector(selector);
  if (!tooltipBox) {
    let tooltipBox = document.createElement('DIV');
    tooltipBox.classList.add(classes['echo-vis-tooltip']);
    tooltipBox.style.position = 'fixed';
    if (unit_id) {
      document.querySelector(`#${unit_id}`)?.appendChild(tooltipBox);
    } else {
      document.body.appendChild(tooltipBox);
    }
    tooltipBox.style.left = tooltip_x + 'px';
    tooltipBox.style.top = tooltip_y + 'px';
    tooltipBox.innerHTML = content;
  } else {
    tooltipBox.style.left = tooltip_x + 'px';
    tooltipBox.style.top = tooltip_y + 'px';
    tooltipBox.innerHTML = content;
  }
}

export function clearTooltip(unit_id?: string) {
  let selector = unit_id ? `#${unit_id} .${classes['echo-vis-tooltip']}` : `.${classes['echo-vis-tooltip']}`;
  let tooltipBox = document.querySelector(selector)
  if (tooltipBox) {
    tooltipBox.remove();
  }
}

export function moveTooltip(e: MouseEvent, unit_id?: string) {
  let selector = unit_id ? `#${unit_id} .${classes['echo-vis-tooltip']}` : `.${classes['echo-vis-tooltip']}`;

  let tooltip_x = e.clientX + 15;
  let tooltip_y = e.clientY + 15;

  let tooltipBox: HTMLElement | null = document.querySelector(selector);
  if (tooltipBox) {
    tooltipBox.style.left = tooltip_x + 'px';
    tooltipBox.style.top = tooltip_y + 'px';
  }
}
