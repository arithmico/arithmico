declare function peg$SyntaxError(
  message: any,
  expected: any,
  found: any,
  location: any
): any;
declare class peg$SyntaxError {
  constructor(message: string, expected: any, found: any, location: any);
  format(sources: any): string;
}
declare namespace peg$SyntaxError {
  function buildMessage(expected: any, found: any): string;
}
declare function peg$parse(
  input: string,
  options: {
    language: "en" | "de";
  }
): any;
export { peg$SyntaxError as SyntaxError, peg$parse as parse };
