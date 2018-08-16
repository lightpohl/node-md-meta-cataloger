let execSync = require('child_process').execSync;
let expectedResult = require('./samples/result');

describe('cli', () => {
    test('should generated expected regular result', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/regular.json`);
        let result = require('./regular');

        expect(result).toEqual(expectedResult);
        execSync(`rm ./test/regular.json`);
    });

    test('should sort results by metadata key', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/sort.json -s title`
        );
        let result = require('./sort');

        let expected = expectedResult
            .concat()
            .sort((a, b) => a.title > b.title);

        expect(result).toEqual(expected);
        execSync(`rm ./test/sort.json`);
    });

    test('should reverse sort result', () => {
        execSync(
            `node bin/bin.js -i ./test/samples/ -o ./test/reverse.json -s title -r`
        );
        let result = require('./reverse');

        let expected = expectedResult
            .concat()
            .sort((a, b) => a.title > b.title)
            .reverse();

        expect(result).toEqual(expected);
        execSync(`rm ./test/reverse.json`);
    });

    test('should remove .md ext from filenames', () => {
        execSync(`node bin/bin.js -i ./test/samples/ -o ./test/ext.json -d`);
        let result = require('./ext');

        let expected = expectedResult.concat().map(item => {
            return Object.assign(item, {filename: item.filename.slice(0, -3)});
        });

        expect(result).toEqual(expected);
        execSync(`rm ./test/ext.json`);
    });
});
