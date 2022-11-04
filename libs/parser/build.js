import peggy from 'peggy';
import fs from 'fs';

const pathToGrammar = 'grammar.peggy';
const outputDir = '../engine/src/parse'; //'src/parse';
const outputPath = '../engine/src/parse/parser.js'; //'src/parse/parser.js';
const grammarSource = fs.readFileSync(pathToGrammar, 'utf8');
const parserSource = peggy.generate(grammarSource, {
    output: 'source',
    format: 'es',
    cache: true,
});

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
fs.writeFileSync(outputPath, parserSource);
