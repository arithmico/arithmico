import peggy from 'peggy';
import fs from 'fs';

const pathToGrammar = 'parser/grammar.peggy';
const outputDir = 'src/parse';
const outputPath = 'src/parse/parser.js';
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
