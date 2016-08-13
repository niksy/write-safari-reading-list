var assert = require('assert');
var fs = require('fs');
var plist = require('simple-plist');
var pify = require('pify');
var fn = require('../');

describe('Create new property list', function () {

	after(function () {
		return pify(fs.unlink)('./test/fixtures/new.plist');
	});

	it('should create new bookmarks property list file with list of items', function () {

		return fn('./test/fixtures/new.plist', [
			{
				title: 'Foo',
				description: 'Foo description',
				url: 'http://example.com/foo',
				dateAdded: new Date(2016, 1, 1, 3, 4, 5, 6)
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date(2016, 1, 2, 3, 4, 5, 6)
			}
		])
			.then(function () {
				return Promise.all([
					pify(plist.readFile)('./test/fixtures/new.plist'),
					pify(plist.readFile)('./test/fixtures/new.expected.plist')
				]);
			})
			.then(function ( res ) {
				assert.deepEqual(res[0], res[1]);
			});

	});

});

describe('Resuse existing property list', function () {

	it('should reuse existing bookmarks property list file and replace Reading List items with new list', function () {

		return fn('./test/fixtures/links.plist', [
			{
				title: 'Foo',
				description: 'Foo description',
				url: 'http://example.com/foo',
				dateAdded: new Date(2016, 1, 1, 3, 4, 5, 6)
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date(2016, 1, 2, 3, 4, 5, 6)
			}
		])
			.then(function () {
				return Promise.all([
					pify(plist.readFile)('./test/fixtures/links.plist'),
					pify(plist.readFile)('./test/fixtures/links.expected.plist')
				]);
			})
			.then(function ( res ) {
				assert.deepEqual(res[0], res[1]);
			});

	});

});
