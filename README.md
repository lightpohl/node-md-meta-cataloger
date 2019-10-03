# node-md-meta-cataloger

## Easily generate a JSON array of markdown files and their inline metadata.

[![NPM Version](https://img.shields.io/npm/v/node-md-meta-cataloger.svg?style=flat)](https://www.npmjs.com/package/node-md-meta-cataloger)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation

`npm install --save node-md-meta-cataloger`

## How to Use

### CLI Tool

`node-md-meta-cataloger -i <dir> -o <path>`

`node-md-meta-cataloger -i /path/to/folder -o /another/path/catalog.json`

`node-md-meta-cataloger --help`

| Option                | Short Flag | Required | Description                           |
| --------------------- | ---------- | -------- | ------------------------------------- |
| --input \<dir\>       | -i         | true     | input directory path                  |
| --output \<dir\>      | -o         | true     | output path of JSON result            |
| --delete-filename-ext | -d         | false    | remove ".md" from filenames in result |
| --config              | -c         | false    | path to .js config file               |
| --version             | -v         | false    | output the version number             |
| --help                | -h         | false    | output usage information              |

#### Config File (--config)

-   Using the `--config` option you can specify a path to a JS config file that should return an object with "camelCased" versions of the existing CLI options (plus extra).
-   If an option exists in both the config file, and as a CLI option, the CLI option will receive priority.

| Option            | Type     | Required | Description                                              |
| ----------------- | -------- | -------- | -------------------------------------------------------- |
| input             | String   | true     | input directory path                                     |
| output            | String   | true     | output path of JSON result                               |
| normalize         | Function | false    | receives results as param, returned object is new result |
| sort              | Function | false    | function for `sort`                                      |
| deleteFilenameExt | Boolean  | false    | remove ".md" from filenames in result if true            |

### Node Module

#### `readMarkdown(path : String) : array or object`

Path parameter may reference a markdown file or folder containing markdown files.

1. If passed a path to a folder, it returns an array of objects containing all markdown file content and their associated metadata.
2. If passed a path to a file, it return an object containing the markdown content and its metadata.

```js
import {readMarkdown} from 'node-md-meta-cataloger';

let result = readMarkdown('path/to/folder');
```

Example value of `result` above:

```js
[
    {
        content: '<p>markdown content</p>',
        filename: 'example.md',
        filepath: 'path/to/folder/example.md',
        metadata: {
            title: 'Title',
            author: 'Joshua'
        }
    }
];
```
