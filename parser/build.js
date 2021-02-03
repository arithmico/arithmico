import pegjs from "pegjs";
import fs from "fs";

const pathToGrammar = "parser/grammar.peg";
const outputPath = "src/parse/parser.js";
const grammarSource = fs.readFileSync(pathToGrammar, 'utf8');
const parserSource = pegjs.generate(grammarSource, {
    output: "source",
    format: "commonjs",
});

fs.writeFileSync(outputPath, parserSource);