let execSync = require('child_process').execSync;
let originalResult = require('./samples/result');

describe('cli', () => {
    let expectedResult;

    beforeEach(() => {
        // deep copy literal values
        expectedResult = JSON.parse(JSON.stringify(originalResult));
    });

    test('should generated expected regular result', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/regular.json`);
        let result = require('./regular');
        execSync(`rm ./test/regular.json`);

        expect(result).toEqual(expectedResult);
    });

    test('should sort results by metadata key', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/sort.json -s title`
        );
        let result = require('./sort');
        execSync(`rm ./test/sort.json`);

        let expected = expectedResult
            .concat()
            .sort((a, b) => a.title > b.title);

        expect(result).toEqual(expected);
    });

    test('should reverse sort result', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/reverse.json -s title -r`
        );
        let result = require('./reverse');
        execSync(`rm ./test/reverse.json`);

        let expected = expectedResult
            .concat()
            .sort((a, b) => a.title > b.title)
            .reverse();

        expect(result).toEqual(expected);
    });

    test('should remove .md ext from filenames', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/ext.json -d`);
        let result = require('./ext');
        execSync(`rm ./test/ext.json`);

        let expected = expectedResult.concat().map(item => {
            return Object.assign(item, {filename: item.filename.slice(0, -3)});
        });

        expect(result).toEqual(expected);
    });

    test('should use only config file', () => {
        execSync(`node bin/bin.js -c ./test/cataloger-regular.config`);
        let result = require('./test-config');
        execSync(`rm ./test/test-config.json`);

        expect(result).toEqual(expectedResult);
    });

    test('should prioritize CLI options', () => {
        execSync(
            `node bin/bin.js -c ./test/cataloger-regular.config -o ./test/override.json`
        );
        let result = require('./override');
        execSync(`rm ./test/override.json`);

        expect(result).toEqual(expectedResult);
    });

    test('should normalize return data', () => {
        execSync(
            `node bin/bin.js -c ./test/cataloger-normalize.config -o ./test/normalize.json`
        );
        let result = require('./normalize');
        execSync(`rm ./test/normalize.json`);

        let expected = expectedResult.concat().map(item => {
            return {title: item.meta.title};
        });

        expect(result).toEqual(expected);
    });
});
