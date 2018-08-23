/* eslint-disable no-console */

let chalk = require('chalk');

function log(...messages) {
    console.log(...messages);
}

function warn(...messages) {
    console.warn(chalk.yellowBright(...messages));
}

function error(...messages) {
    console.error(chalk.redBright(...messages));
}

function success(...messages) {
    console.log(chalk.greenBright(...messages));
}

module.exports = {
    log,
    warn,
    error,
    success
};
