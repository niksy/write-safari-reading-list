# write-safari-reading-list

[![Build Status][ci-img]][ci]

Write Safari Reading List.

## Install

```sh
npm install write-safari-reading-list --save
```

## Usage

```js
var writeList = require('write-safari-reading-list');

writeList('./Bookmarks.plist', [
	{
		title: 'https://www.npmjs.com/package/axe-core',
		description: 'Accessibility engine for automated Web UI testing',
		url: 'https://www.npmjs.com/package/axe-core',
		dateAdded: new Date('2016-07-31T09:11:41.000Z')
	},
	{
		title: '“Array” Methods',
		description: '_.chunk(array, [size=1]) # Ⓢ Ⓝ Creates an array of elements ...',
		url: 'https://lodash.com/docs',
		dateAdded: new Date('2016-07-31T12:36:22.000Z')
	}
])
	.then(function () {
		console.log('Done!');
	});
```

## API

### writeList(filePath, data)

Returns: `Promise`

Writes property list to file with provided data. If property list exists at the path it reuses it, otherwise uses basic template for generating Bookmarks.plist file.

#### filePath

Type: `String`  
Default: `~/Library/Safari/Bookmarks.plist`  
**Required**

Path to property list.

#### data

Type: `Object[]`

List of Reading List links.

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/write-safari-reading-list
[ci-img]: https://img.shields.io/travis/niksy/write-safari-reading-list.svg
