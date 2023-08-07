import {globSync} from 'glob';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const META_START_STOP = '---';

function gatherMarkdownData(mdPath) {
    const mdData = parseMarkdown(mdPath);
    mdData.filename = path.basename(mdPath);
    mdData.filepath = path.normalize(mdPath);

    return mdData;
}

export function parseMarkdown(mdFilePath) {
    const content = fs.readFileSync(mdFilePath, 'utf8');

    const metaStart = content.indexOf(META_START_STOP) + META_START_STOP.length;
    const metaEnd = content.indexOf(META_START_STOP, metaStart);

    const mdData = {};
    if (metaStart < 0 || metaEnd <= metaStart) {
        mdData.meta = {};
        mdData.content = content;
    } else {
        const metaString = content.slice(metaStart, metaEnd);
        const bodyStart = metaEnd + META_START_STOP.length;

        mdData.meta = yaml.load(metaString, 'utf8');
        mdData.content = content.slice(bodyStart).trim();
    }

    return mdData;
}

export function readMarkdown(folderOrFilePath) {
    const mdItems = [];
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(folderOrFilePath)) {
            throw new Error(`${folderOrFilePath} does not exist`);
        }

        const stats = fs.lstatSync(folderOrFilePath);
        if (!stats.isDirectory()) {
            resolve(gatherMarkdownData(folderOrFilePath));
        }

        try {
            const res = globSync(`${folderOrFilePath}/**/*.md`);

            res.forEach((mdFilePath) =>
                mdItems.push(gatherMarkdownData(mdFilePath)),
            );

            resolve(mdItems);
        } catch (err) {
            reject(err);
        }
    });
}
