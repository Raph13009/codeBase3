/**
 * The "B" of the BoostAI mark, traced from /brand/boostai-logo.png.
 * Units: glyph height = 2 (y from -1 to 1, y up), centred on the origin.
 * Shared by the SVG loader and the 3D hero mark so both draw the same letter.
 */
export type PathCmd =
  | ["M", number, number]
  | ["L", number, number]
  | ["C", number, number, number, number, number, number]
  | ["Z"];

export const B_OUTER: PathCmd[] = [
  ["M", -0.82, -1],
  ["L", 0.18, -1],
  ["C", 0.577, -1, 0.82, -0.789, 0.82, -0.446],
  ["C", 0.82, -0.138, 0.6, 0.03, 0.417, 0.05],
  ["C", 0.56, 0.085, 0.719, 0.22, 0.719, 0.46],
  ["C", 0.719, 0.773, 0.496, 1, 0.187, 1],
  ["L", -0.82, 1],
  ["Z"],
];

export const B_HOLES: PathCmd[][] = [
  [
    ["M", -0.504, 0.763],
    ["L", 0.115, 0.763],
    ["C", 0.299, 0.763, 0.432, 0.636, 0.432, 0.46],
    ["C", 0.432, 0.285, 0.314, 0.158, 0.151, 0.158],
    ["L", -0.504, 0.158],
    ["Z"],
  ],
  [
    ["M", -0.504, -0.101],
    ["L", 0.187, -0.101],
    ["C", 0.379, -0.101, 0.518, -0.235, 0.518, -0.425],
    ["C", 0.518, -0.616, 0.388, -0.748, 0.223, -0.748],
    ["L", -0.504, -0.748],
    ["Z"],
  ],
];

/** SVG path (y down) for a viewBox centred on (cx, cy). */
export function toSvgPath(cmds: PathCmd[], scale: number, cx = 50, cy = 50): string {
  const X = (x: number) => +(cx + x * scale).toFixed(2);
  const Y = (y: number) => +(cy - y * scale).toFixed(2);
  return cmds
    .map((c) => {
      switch (c[0]) {
        case "M":
          return `M${X(c[1])} ${Y(c[2])}`;
        case "L":
          return `L${X(c[1])} ${Y(c[2])}`;
        case "C":
          return `C${X(c[1])} ${Y(c[2])} ${X(c[3])} ${Y(c[4])} ${X(c[5])} ${Y(c[6])}`;
        default:
          return "Z";
      }
    })
    .join("");
}

/** Full B (outer contour + counters) for an evenodd SVG fill. */
export const bSvgPath = (scale = 26, cx = 50, cy = 50) =>
  [B_OUTER, ...B_HOLES].map((p) => toSvgPath(p, scale, cx, cy)).join("");
