import rawBrailleMapping from "./braille-character-mapping.json";

const brailleMapping = rawBrailleMapping as Record<string, string>;

export function convertToBraille(text: string) {
  return [...text.replaceAll("→", "->")].map((c) => brailleMapping[c]).join("");
}
