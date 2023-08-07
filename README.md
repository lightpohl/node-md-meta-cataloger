# node-md-meta-cataloger

## Easily generate a JSON array of markdown files and their inline metadata.

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

-   Using the `--config` option you can specify a path to a JS config file (an ES module) that should return a default object exported with "camelCased" versions of the existing CLI options (plus any extra).
-   If an option exists in both the config file and as a CLI option, then the CLI option will receive priority.

| Option            | Type     | Required | Description                                              |
| ----------------- | -------- | -------- | -------------------------------------------------------- |
| input             | String   | true     | input directory path                                     |
| output            | String   | true     | output path of JSON result                               |
| normalize         | Function | false    | receives results as param, returned object is new result |
| sort              | Function | false    | function for `sort`                                      |
| deleteFilenameExt | Boolean  | false    | remove ".md" from filenames in result if true            |

### Node Module

#### `readMarkdown(path: String): Promise<Array|Object>`

Path parameter may reference a markdown file or folder containing markdown files.

1. If passed a path to a folder, it returns a promise that resolves to an array of objects containing all markdown file content and their associated metadata.
2. If passed a path to a file, it return a promise that resolves to an object containing the markdown content and its metadata.

```js
import {readMarkdown} from 'node-md-meta-cataloger';

const result = await readMarkdown('path/to/folder');
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
            author: 'Joshua',
        },
    },
];
```
