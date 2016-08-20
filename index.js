var path = require('path');
var pify = require('pify');
var plist = require('simple-plist');
var untildify = require('untildify');
var READING_LIST_FILE = '~/Library/Safari/Bookmarks.plist';

var template = {
	Children: [{
		Children: [],
		Title: 'com.apple.ReadingList',
		WebBookmarkType: 'WebBookmarkTypeList'
	}],
	WebBookmarkType: 'WebBookmarkTypeList'
};

/**
 * @param  {String} fp
 * @param  {Object[]} data
 *
 * @return {Promise}
 */
module.exports = function ( fp, data ) {

	var resolvedFp;

	if ( typeof fp !== 'string' ) {
		resolvedFp = untildify(READING_LIST_FILE);
		data = fp;
	} else {
		resolvedFp = untildify(path.resolve(fp));
	}

	return pify(plist.readFile)(resolvedFp)
		.catch(function () {
			return template;
		})
		.then(function ( res ) {

			var newRes = Object.assign({}, res);

			newRes.Children
				.filter(function ( child ) {
					return child.Title === 'com.apple.ReadingList';
				})
				.forEach(function ( child ) {
					child.Children = [].concat(data).map(function ( item ) {
						return {
							ReadingList: {
								DateAdded: new Date(item.dateAdded).toJSON(),
								PreviewText: item.description
							},
							URIDictionary: {
								title: item.title
							},
							URLString: item.url
						};
					});
				});

			return newRes;

		})
		.then(function ( newRes ) {
			return pify(plist.writeBinaryFile)(resolvedFp, newRes);
		});

};
