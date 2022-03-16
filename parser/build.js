import peggy from "peggy";
import fs from "fs";

const pathToGrammar = "parser/grammar.peggy";
const outputPath = "src/parse/parser.js";
const grammarSource = fs.readFileSync(pathToGrammar, "utf8");
const parserSource = peggy.generate(grammarSource, {
  output: "source",
  format: "commonjs",
});

fs.writeFileSync(outputPath, parserSource);
