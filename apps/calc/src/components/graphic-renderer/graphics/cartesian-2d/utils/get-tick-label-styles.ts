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
