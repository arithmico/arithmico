export function getTickLabelStyles(braille: boolean) {
  return braille
    ? {
        fontFamily: "Apple Braille",
        fontSize: 0.09,
      }
    : {
        fontSize: 0.04,
      };
}

export function getTickLabelDebugStyles(debug: boolean) {
  return debug
    ? {
        stroke: "yellow",
        strokeWidth: 0.001,
      }
    : {};
}
