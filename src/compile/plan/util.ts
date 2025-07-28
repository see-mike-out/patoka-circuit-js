import type { ImageLoader, SvgGradientStop } from "../../dtypes/internal";

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

export function getGradient(colors: string[]): SvgGradientStop[] | null {
  let n = colors.length;
  if (n <= 1) return null;
  let u = 100 / (n - 1);
  let res: SvgGradientStop[] = colors.map((d, i) => {
    return {
      offset: `${(u * i)}%`,
      "stop-color": d
    }
  });
  return res;
}

const svgns = 'http://www.w3.org/2000/svg';

export function addGradientDef(
  pid: string | number,
  def: { id: string, grad_data: SvgGradientStop[] }
) {
  // Create a <stop> element and set its offset based on the position of the for loop.
  let svg = document.querySelector(`#${pid}`);
  if (svg) {
    let svgdefs = document.querySelector(`#${pid} defs`);
    if (!svgdefs) {
      svgdefs = document.createElementNS(svgns, "defs");
    }
    let g = document.createElementNS(svgns, "linearGradient");
    g.setAttribute("id", def.id);
    g.setAttribute("x1", '0');
    g.setAttribute("x2", '0');
    g.setAttribute("y1", '0');
    g.setAttribute("y2", '1');
    def.grad_data.forEach((d) => {
      let stop = document.createElementNS(svgns, 'stop');
      stop.setAttribute('offset', d.offset);
      stop.setAttribute('stop-color', d["stop-color"]);
      g.appendChild(stop);
    });
    svgdefs.appendChild(g);
    svg.appendChild(svgdefs);
  }
}

export async function getSVGimageLink(
  unit_id: string,
  id: string
): Promise<ImageLoader | null> {
  // ref: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
  // ref: https://www.cjav.dev/articles/svg-to-png-with-javascript

  return new Promise(async (resolve: Function, reject: Function) => {
    // get the svg element.
    let svg = document.querySelector(`#circuit-viewer-${unit_id} #${id}`);
    if (svg === null) {
      reject({ message: "SVG not found." });
    } else {
      let width = svg.clientWidth, height = svg.clientHeight;

      //get svg source.
      let serializer = new XMLSerializer();
      let source = serializer.serializeToString(svg);

      //add name spaces.
      if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns="http://www.w3.org/2000/svg"',
        );
      }
      if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(
          /^<svg/,
          '<svg xmlns:xlink="http://www.w3.org/1999/xlink"',
        );
      }

      //add xml declaration
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

      let svg_blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      let svg_blob_url = URL.createObjectURL(svg_blob);

      let canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${width}`);
      canvas.setAttribute("height", `${height}`);
      document.body.appendChild(canvas);
      let ctx = canvas.getContext("2d");
      let img = new Image();
      img.src = svg_blob_url;
      img.onload = () => {
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          let png = canvas.toDataURL("image/png");
          URL.revokeObjectURL(png);
          canvas.remove();
          resolve({ png, id, svg: svg_blob_url });
        }
        reject({ message: "Canvas cannot be drawn." });
      };
    }
  });
}


export function round(n: number, d: number) {
  let e = Math.pow(10, d);
  return Math.round(n * e) / e;
}