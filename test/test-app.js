'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fse = require('fs-extra');

var mockPrompts = {
  name: 'name' ,
  description : 'Description',
  version: '0.0.1',
  authorName: 'Author name',
  authorEmail: 'Author email',
  npmRepository: 'http://my-private-registry.org'
};

 describe('when called with prompts (no modules - no builds)', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
       .inTmpDir(function (dir) {
       // `dir` is the path to the new temporary directory
       fse.copySync(path.join(__dirname, '../generators/app/templates'), dir);
       })
      .withOptions({ skipInstall: true })
      .withPrompts(mockPrompts)
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'README.md',
      'Gruntfile.js',
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
