#!/usr/bin/env node

let fs = require('fs');
let program = require('commander');
let cataloger = require('../lib/index');
let {evaluateOptions} = require('./evaluate');
let logger = require('./logger');

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
    .option('-c, --config <path>', 'specify path to config file')
    .parse(process.argv);

let options = evaluateOptions(program);

cataloger.readMarkdown(options.input).then(results => {
    if (results.length === 0) {
        logger.error(
            'ERROR: No ".md" files found. Please verify input directory path'
        );
        process.exit(1);
    }

    if (options.deleteFilenameExt) {
        results = results.map(item => {
            item.filename = item.filename.slice(0, -3);
            return item;
        });
    }

    if (options.sort) {
        if (typeof options.sort === 'function') {
            results.sort(options.sort);
        } else {
            results.sort((a, b) => {
                if (typeof a.meta[options.sort] === 'undefined') {
                    logger.warn(
                        `WARNING: "${a.filepath}" missing meta property "${
                            options.sort
                        }" for sorting`
                    );
                }

                if (typeof b.meta[options.sort] === 'undefined') {
                    logger.warn(
                        `WARNING: "${b.filepath}" missing meta property "${
                            options.sort
                        }" for sorting`
                    );
                }

                return a.meta[options.sort] > b.meta[options.sort] ? 1 : -1;
            });
        }
    }

    if (options.reverse) {
        results.reverse();
    }

    if (options.normalize) {
        results = options.normalize(results);
    }

    let output = JSON.stringify(results, null, 2);
    fs.writeFileSync(options.output, output, 'utf8');

    logger.success('Complete!');
});
