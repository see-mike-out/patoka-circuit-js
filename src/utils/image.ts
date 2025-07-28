import type { ImageLoader } from "../dtypes/internal";

export async function getSVGimageLink(
  selector: string,
  unit_id?: string,
): Promise<ImageLoader | null> {
  // ref: https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
  // ref: https://www.cjav.dev/articles/svg-to-png-with-javascript

  return new Promise(async (resolve: Function, reject: Function) => {
    // get the svg element.
    let svg = document.querySelector(`#${unit_id} ${selector} svg`);
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
          resolve({ png, selector, svg: svg_blob_url });
        }
        reject({ message: "Canvas cannot be drawn." });
      };
    }
  });
}

