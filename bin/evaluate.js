let path = require('path');
let logger = require('./logger');

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
        errorAndExit('ERROR: No input directory (--input) specified');
    } else if (!combinedOptions.output) {
        errorAndExit('ERROR: No output path specified');
    } else if (!combinedOptions.output.endsWith('.json')) {
        errorAndExit(
            `ERROR: Path "${combinedOptions.ouput}" does not end in ".json"`
        );
    }

    return combinedOptions;
}

function errorAndExit(message) {
    logger.error(message);
    process.exit(1);
}

module.exports = {evaluateOptions};
