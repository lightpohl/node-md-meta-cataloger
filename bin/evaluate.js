/* eslint-disable no-console */
let path = require('path');

const PROCESS_ROOT = process.cwd();

function evaluateOptions(clOptions) {
    let combinedOptions = clOptions;

    if (clOptions.config) {
        let configOptions = require(path.resolve(
            PROCESS_ROOT,
            clOptions.config
        ));
        combinedOptions = Object.assign(configOptions, clOptions);
    }

    if (!combinedOptions.input) {
        errorAndExit('Error: no input directory (--input) specified');
    } else if (!combinedOptions.output) {
        errorAndExit('Error: no output path specified');
    } else if (!combinedOptions.output.endsWith('.json')) {
        errorAndExit(
            `Error: path '${combinedOptions.ouput}' does not end in '.json'`
        );
    }

    return combinedOptions;
}

function errorAndExit(message) {
    console.error(message);
    console.error(`Run 'node-md-meta-cataloger --help' for usage information`);
    process.exit(1);
}

module.exports = {evaluateOptions};
