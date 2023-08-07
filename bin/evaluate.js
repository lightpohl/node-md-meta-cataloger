import path from 'path';
import {logger} from './logger.js';

const PROCESS_ROOT = process.cwd();

function errorAndExit(message) {
    logger.error(message);
    process.exit(1);
}

export async function evaluateOptions(clOptions) {
    let combinedOptions = clOptions;

    if (clOptions.config) {
        const configPath = `file://${path.resolve(
            PROCESS_ROOT,
            clOptions.config,
        )}`;

        const configOptions = (await import(configPath)).default;

        combinedOptions = Object.assign(configOptions, clOptions);
    }

    if (!combinedOptions.input) {
        errorAndExit('ERROR: No input directory (--input) specified');
    } else if (!combinedOptions.output) {
        errorAndExit('ERROR: No output path specified');
    } else if (!combinedOptions.output.endsWith('.json')) {
        errorAndExit(
            `ERROR: Path "${combinedOptions.ouput}" does not end in ".json"`,
        );
    }

    return combinedOptions;
}
