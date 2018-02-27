const util = require('util');
const path = require('path');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const packageJSON = require('../package.json');

// NOTE: pattern for string like 'https://unpkg.com/odata-filter-builder@1.0.0/dist/odata-filter-builder.js'
const UNPKG_URL_REPLACE_PATTERN = /(https?:\/\/unpkg.com)\/([\w-]+)@(\d+\.\d+\.\d+)\/(.+)/gi;

function replaceUnpkgVersion(markdownString, version) {
  return markdownString.replace(
    UNPKG_URL_REPLACE_PATTERN,
    `$1/$2@${version}/$4`,
  );
}

function updateVersionInMarkdown(filePath) {
  return readFile(filePath).then(content =>
    writeFile(
      filePath,
      replaceUnpkgVersion(content.toString(), packageJSON.version),
    ),
  );
}

updateVersionInMarkdown(path.resolve(__dirname, '../README.md'))
  .catch(error => {
    // eslint-disable-next-line
    console.error('ERROR: Unable to update version in `md` files', error);
    process.exit(1);
  });