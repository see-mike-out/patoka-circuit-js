let ratio_divider = [2, 3, 4, 6, 8, 16, 32];

export function get_radian_names(
  value: number | string | undefined,
  noround?: boolean
): string | number {
  if (value === undefined) {
    return '';
  } else if (typeof value === 'string') {
    return value;
  }
  let ratio = value / Math.PI;
  if (ratio == 0) return "0";
  else if (ratio == 1)
    return "π";
  else if (ratio == -1)
    return "-π";
  else {
    let sign = ratio < 0 ? "-" : "";
    let abs_ratio = Math.abs(ratio).toPrecision(8);
    let done: string[] = [];
    for (let div of ratio_divider) {
      for (let nom = 1; nom < div; nom++) {
        let r = (nom / div).toPrecision(8)
        if (!done.includes(r)) {
          if (abs_ratio == r) {
            return sign + (nom == 1 ? "" : nom) + "π/" + div;
          } else {
            done.push(r);
          }
        }
      }
    }
    if (noround) {
      return value;
    } else {
      return Math.round(value * 100) / 100;
    }
  }
}

export function round(n: number, d: number) {
  let e = Math.pow(10, d);
  return Math.round(n * e) / e;
}