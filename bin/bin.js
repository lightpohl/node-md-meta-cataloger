#!/usr/bin/env node

import fs from 'fs';
import {program} from 'commander';
import {createRequire} from 'module';
import * as cataloger from '../lib/index.js';
import {evaluateOptions} from './evaluate.js';
import {logger} from './logger.js';

const require = createRequire(import.meta.url);
const version = require('../package.json').version;

program
    .version(version, '-v, --version')
    .option('-i, --input <dir>', 'required: input directory path')
    .option('-o, --output <path>', 'required: output path of JSON result')
    .option(
        '-d, --delete-filename-ext',
        'remove ".md" from filenames in result',
    )
    .option('-c, --config <path>', 'specify path to config file')
    .parse(process.argv);

const options = await evaluateOptions(program.opts());

let results = await cataloger.readMarkdown(options.input);

if (results.length === 0) {
    logger.error(
        'ERROR: No ".md" files found. Please verify input directory path',
    );
    process.exit(1);
}

if (options.deleteFilenameExt) {
    results = results.map((item) => {
        item.filename = item.filename.slice(0, -3);
        return item;
    });
}

if (options.sort) {
    results.sort(options.sort);
}

if (options.normalize) {
    results = options.normalize(results);
}

const output = JSON.stringify(results, null, 2);
fs.writeFileSync(options.output, output, 'utf8');

logger.success('Complete!');
