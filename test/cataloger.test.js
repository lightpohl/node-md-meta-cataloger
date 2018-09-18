let cataloger = require('../lib/index');

describe('cataloger', () => {
    describe('parseMarkdown', () => {
        test('should parse samples/regular.md', () => {
            let result = cataloger.parseMarkdown('test/samples/regular.md');

            expect(result).toEqual({
                content: '<h1>Regular</h1>\n<p>lorem ipsum</p>',
                meta: {
                    title: 'regular',
                    author: 'joshua'
                }
            });
        });

        test('should parse samples/space-before-after.md', () => {
            let result = cataloger.parseMarkdown(
                'test/samples/space-before-after.md'
            );

            expect(result).toEqual({
                content: '<h1>Space Before After</h1>\n<p>lorem ipsum</p>',
                meta: {
                    title: 'space before after',
                    author: 'joshua'
                }
            });
        });

        test('should parse samples/no-meta.md', () => {
            let result = cataloger.parseMarkdown('test/samples/no-meta.md');

            expect(result).toEqual({
                content: '<h1>No Meta</h1>\n<p>lorem ipsum</p>\n',
                meta: {}
            });
        });
    });

    describe('readMarkdown', () => {
        let expectedResult = [
            {
                content: '<h1>Nested</h1>\n<p>lorem ipsum</p>',
                filename: 'nested.md',
                filepath: 'test/samples/nested/nested.md',
                meta: {
                    title: 'nested',
                    author: 'joshua'
                }
            },
            {
                content: '<h1>No Meta</h1>\n<p>lorem ipsum</p>\n',
                filename: 'no-meta.md',
                filepath: 'test/samples/no-meta.md',
                meta: {}
            },
            {
                content: '<h1>Regular</h1>\n<p>lorem ipsum</p>',
                filename: 'regular.md',
                filepath: 'test/samples/regular.md',
                meta: {
                    title: 'regular',
                    author: 'joshua'
                }
            },
            {
                content: '<h1>Space Before After</h1>\n<p>lorem ipsum</p>',
                filename: 'space-before-after.md',
                filepath: 'test/samples/space-before-after.md',
                meta: {
                    title: 'space before after',
                    author: 'joshua'
                }
            }
        ];

        test('should parse folder of .md files and return array', done => {
            cataloger.readMarkdown('test/samples').then(result => {
                result.sort((a, b) => a.filename > b.filename);

                expect(result).toEqual(expectedResult);
                done();
            });
        });

        test('should parse .md file and return object', done => {
            cataloger.readMarkdown('test/samples/regular.md').then(result => {
                expect(result).toEqual(expectedResult[2]);
                done();
            });
        });

        test('should throw error if file does not exist', done => {
            cataloger.readMarkdown('test/doesNotExist.md').catch(() => {
                done();
            });
        });
    });
});
