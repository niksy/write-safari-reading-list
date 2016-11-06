var assert = require('assert');
var fs = require('fs');
var path = require('path');
var plist = require('simple-plist');
var pify = require('pify');
var proxyquire = require('proxyquire');
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
				dateAdded: new Date('2016-02-01T02:04:05.006Z')
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date('2016-02-02T02:04:05.006Z')
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
				dateAdded: new Date('2016-02-01T02:04:05.006Z')
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date('2016-02-02T02:04:05.006Z')
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

describe('Use default Reading List property list', function () {

	it('should reuse default Reading List property list file and replace Reading List items with new list', function () {

		var pfn = proxyquire('../', {
			untildify: function () {
				return path.resolve('./test/fixtures/links.plist');
			}
		});
		var fp;

		var p1 = pfn([
			{
				title: 'Foo',
				description: 'Foo description',
				url: 'http://example.com/foo',
				dateAdded: new Date('2016-02-01T02:04:05.006Z')
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date('2016-02-02T02:04:05.006Z')
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

		var p2 = pfn(fp, [
			{
				title: 'Foo',
				description: 'Foo description',
				url: 'http://example.com/foo',
				dateAdded: new Date('2016-02-01T02:04:05.006Z')
			},
			{
				title: 'Bar',
				description: 'Bar description',
				url: 'http://example.com/bar',
				dateAdded: new Date('2016-02-02T02:04:05.006Z')
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

		return Promise.all([p1, p2]);

	});

});
