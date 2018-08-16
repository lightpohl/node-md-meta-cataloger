let fs = require('fs');
let program = require('commander');
let cataloger = require('../src/index');
let evaluateOptions = require('./util').evaluateOptions;

program
    .version('1.0.0', '-v, --version')
    .option('-i, --input <dir>', 'required: input directory path')
    .option('-o, --output <path>', 'required: output path of JSON result')
    .option('-s, --sort <key>', 'sort by metadata key (ascending)')
    .option('-r, --reverse', 'reverse result sort')
    .option(
        '-d, --delete-filename-ext',
        'remove ".md" from filenames in result'
    )
    .parse(process.argv);

evaluateOptions(program);

cataloger.readMarkdown(program.input).then(results => {
    if (program.deleteFilenameExt) {
        results = results.map(item => {
            item.filename = item.filename.slice(0, -3);
            return item;
        });
    }

    if (program.sort) {
        results.sort((a, b) => a[program.sort] > b[program.sort]);
    }

    if (program.reverse) {
        results.reverse();
    }
    let output = JSON.stringify(results, null, 2);
    fs.writeFileSync(program.output, output, 'utf8');
});
