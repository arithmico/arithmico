const peggy = require('peggy');
const fs = require('fs');

const pathToGrammar = 'parser/grammar.peggy';
const outputPath = 'src/parse/parser.js';
const grammarSource = fs.readFileSync(pathToGrammar, 'utf8');
const parserSource = peggy.generate(grammarSource, {
    output: 'source',
    format: 'commonjs',
    cache: true,
});

fs.writeFileSync(outputPath, parserSource);
