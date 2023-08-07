/* eslint-disable no-console */
function log(...messages) {
    console.log(...messages);
}

function warn(...messages) {
    console.warn(...messages);
}

function error(...messages) {
    console.error(...messages);
}

function success(...messages) {
    console.log(...messages);
}

export const logger = {
    log,
    warn,
    error,
    success,
};
