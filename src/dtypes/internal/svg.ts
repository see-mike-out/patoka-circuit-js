export type TextAnchorValue = "start" | "middle" | "end";
export type TextAlignmentBaselineValue = "inherit" | "auto" | "middle" | "baseline" | "before-edge" | "text-before-edge" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical";

export type SvgPlan = {
  type: "svg",
  width: number,
  height: number,
  viewBox: [number, number, number, number],
  groups: { [key: string]: SvgGroup },
  unit_id?: string,
  selector: string
}

export type SvgElem = SvgGroup
  | SvgText
  | SvgRect
  | SvgClickWrap
  | SvgLine
  | SvgDoubleLine
  | SvgX
  | SvgCircle
  | SvgPath;

export type SvgWrapperElem = SvgGroup | SvgClickWrap;
export type SvgLineElem = SvgLine | SvgDoubleLine;

type SvgIRC = {
  // optional (structural, recommended)
  id?: string,
  _class?: string,
  role?: string,
  data?: any
  // optional
  transform?: string
}

type FillAttrs = {
  // optional (properties)
  fill?: string,
  "fill-opacity"?: number,
};
type StrokeAttrs = {
  stroke?: string,
  "stroke-width"?: number
  "stroke-opacity"?: number,
}

export type SvgGroup = SvgIRC & {
  // required
  type: "g",
  x: number,
  y: number,
  elem: SvgElem[],

  width: number,
  height: number,
};

export type SvgText = SvgIRC & {
  // required
  type: "text",
  x: number,
  y: number,
  text: string,

  // optional (properties)
  width?: number,
  height?: number,
  "text-anchor"?: TextAnchorValue,
  "alignment-baseline"?: TextAlignmentBaselineValue,
  "font-size"?: number,
  "font-weight"?: number,
  "font-style"?: number | string,
} & FillAttrs & StrokeAttrs;

export type SvgRect = SvgIRC & {
  // required
  type: "rect",
  x: number,
  y: number,
  width: number,
  height: number
} & StrokeAttrs & FillAttrs;

export type SvgClickWrap = SvgIRC & {
  // required
  type: "click-wrap",
  x: number,
  y: number,
  width: number,
  height: number,
  data: any
};

type SvgLineDefault = SvgIRC & {
  // required for positioning
  x1: number,
  x2: number,
  y1: number,
  y2: number,
} & StrokeAttrs;

export type SvgLine = SvgLineDefault & {
  // required
  type: "line"
}

export type SvgDoubleLine = SvgLineDefault & {
  // required
  type: "double-line"
};

export type SvgX = SvgIRC & {
  // required
  type: "x",
  cx: number,
  cy: number,
  width: number,
  height: number
} & StrokeAttrs & FillAttrs;

export type SvgCircle = SvgIRC & {
  // required
  type: "circle",
  cx: number,
  cy: number,
  r: number,
} & StrokeAttrs & FillAttrs;

export type SvgPath = SvgIRC & {
  // required
  type: "path",
  path: string
} & StrokeAttrs & FillAttrs;


export type SvgGradientStop = {
  offset: `${number}%`,
  "stop-color": string
};