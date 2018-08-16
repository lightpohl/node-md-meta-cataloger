# node-md-meta-cataloger

## Easy generate a JSON catalog of markdown files and their inline metadata.

[![NPM Version](https://img.shields.io/npm/v/node-md-meta-cataloger.svg?style=flat)](https://www.npmjs.com/package/node-md-meta-cataloger)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Installation

`npm install --save node-md-meta-cataloger'

## How to Use

### CLI Tool

`node-md-meta-cataloger -i <dir> -o <path>`

`node-md-meta-cataloger -i /path/to/folder -o /another/path/catalog.json`

`node-md-meta-cataloger --help`

| Option                | Short Flag | Required | Description                           |
| --------------------- | ---------- | -------- | ------------------------------------- |
| --input \<dir\>       | -i         | true     | input directory path                  |
| --output \<dir\>      | -o         | true     | output path of JSON result            |
| --sort \<key\>        | -s         | false    | sort by metadata key (ascending)      |
| --reverse             | -r         | false    | reverse result sort                   |
| --delete-filename-ext | -d         | false    | remove ".md" from filenames in result |
| --version             | -v         | false    | output the version number             |
| --help                | -h         | false    | output usage information              |

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
