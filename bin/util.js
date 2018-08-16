/* eslint-disable no-console */

function evaluateOptions(options) {
    if (!options.input) {
        errorAndExit('Error: no input directory (--input) specified');
    } else if (!options.output) {
        errorAndExit('Error: no output path specified');
    } else if (!options.output.endsWith('.json')) {
        errorAndExit(`Error: path '${options.ouput}' does not end in '.json'`);
    }
}

function errorAndExit(message) {
    console.error(message);
    console.error(`Run 'node-md-meta-cataloger --help' for usage information`);
    process.exit(1);
}

module.exports = {evaluateOptions};
