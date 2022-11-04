import peggy from 'peggy';
import fs from 'fs';

const pathToGrammar = 'grammar.peggy';
const outputDir = 'generated';
const outputPath = 'generated/parser.js';
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
