let execSync = require('child_process').execSync;
let _cloneDeep = require('lodash/cloneDeep');
let fs = require('fs-extra');
let originalResult = require('./samples/result');

describe('cli', () => {
    let expectedResult;

    beforeEach(() => {
        expectedResult = _cloneDeep(originalResult);
    });

    test('should generated expected regular result', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/regular.json`);
        let result = require('./regular');
        fs.removeSync('./test/regular.json');

        expect(result).toEqual(expectedResult);
    });

    test('should sort results by metadata key', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/sort.json -s title`
        );
        let result = require('./sort');
        fs.removeSync('./test/sort.json');

        let expected = expectedResult
            .concat()
            .sort((a, b) => (a.meta.title > b.meta.title ? 1 : -1));

        expect(result).toEqual(expected);
    });

    test('should reverse sort result', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/reverse.json -s title -r`
        );
        let result = require('./reverse');
        fs.removeSync(`./test/reverse.json`);

        let expected = expectedResult
            .concat()
            .sort((a, b) => a.title > b.title)
            .reverse();

        expect(result).toEqual(expected);
    });

    test('should remove .md ext from filenames', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/ext.json -d`);
        let result = require('./ext');
        fs.removeSync(`./test/ext.json`);

        let expected = expectedResult.concat().map(item => {
            return Object.assign(item, {filename: item.filename.slice(0, -3)});
        });

        expect(result).toEqual(expected);
    });

    test('should use only config file', () => {
        execSync(`node bin/bin.js -c ./test/cataloger-regular.config`);
        let result = require('./test-config');
        fs.removeSync(`./test/test-config.json`);

        expect(result).toEqual(expectedResult);
    });

    test('should prioritize CLI options', () => {
        execSync(
            `node bin/bin.js -c ./test/cataloger-regular.config -o ./test/override.json`
        );
        let result = require('./override');
        fs.removeSync(`./test/override.json`);

        expect(result).toEqual(expectedResult);
    });

    test('should normalize return data', () => {
        execSync(
            `node bin/bin.js -c ./test/cataloger-normalize.config -o ./test/normalize.json`
        );
        let result = require('./normalize');
        fs.removeSync(`./test/normalize.json`);

        let expected = expectedResult.concat().map(item => {
            return {title: item.meta.title};
        });

        expect(result).toEqual(expected);
    });
});
