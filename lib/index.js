let glob = require('glob');
let yaml = require('js-yaml');
let fs = require('fs');
let path = require('path');

const META_START_STOP = '---';

function parseMarkdown(mdFilePath) {
    let content = fs.readFileSync(mdFilePath, 'utf8');

    let metaStart = content.indexOf(META_START_STOP) + META_START_STOP.length;
    let metaEnd = content.indexOf(META_START_STOP, metaStart);

    let mdData = {};
    if (metaStart < 0 || metaEnd <= metaStart) {
        mdData.meta = {};
        mdData.content = content;
    } else {
        let metaString = content.slice(metaStart, metaEnd);
        let bodyStart = metaEnd + META_START_STOP.length;

        mdData.meta = yaml.safeLoad(metaString, 'utf8');
        mdData.content = content.slice(bodyStart).trim();
    }

    return mdData;
}

function readMarkdown(folderOrFilePath) {
    let mdItems = [];
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(folderOrFilePath)) {
            throw new Error(`${folderOrFilePath} does not exist`);
        }

        let stats = fs.lstatSync(folderOrFilePath);
        if (!stats.isDirectory()) {
            resolve(gatherMarkdownData(folderOrFilePath));
        }

        glob(`${folderOrFilePath}/**/*.md`, (err, res) => {
            if (err) {
                reject(err);
            }

            res.forEach(mdFilePath =>
                mdItems.push(gatherMarkdownData(mdFilePath))
            );

            resolve(mdItems);
        });
    });
}

function gatherMarkdownData(mdPath) {
    let mdData = parseMarkdown(mdPath);
    mdData.filename = path.basename(mdPath);
    mdData.filepath = path.normalize(mdPath);

    return mdData;
}

module.exports = {
    parseMarkdown,
    readMarkdown
};
