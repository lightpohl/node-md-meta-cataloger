module.exports = {
    input: './test/samples/',
    output: './test/normalize-config.json',
    normalize: results => {
        return results.map(item => {
            return {title: item.meta.title};
        });
    }
};
