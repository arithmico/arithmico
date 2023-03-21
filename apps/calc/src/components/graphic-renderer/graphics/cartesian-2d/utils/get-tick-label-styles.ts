export function getTickLabelStyles(braille: boolean) {
  return braille
    ? {
        fontFamily: "Apple Braille",
        fontSize: 0.07,
      }
    : {
        fontSize: 0.04,
      };
}
