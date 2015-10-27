/*
 Copyright (c) 2012 GFT Appverse, S.L., Sociedad Unipersonal.
 This Source Code Form is subject to the terms of the Appverse Public License
 Version 2.0 (“APL v2.0”). If a copy of the APL was not distributed with this
 file, You can obtain one at http://www.appverse.mobi/licenses/apl_v2.0.pdf. [^]
 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the conditions of the AppVerse Public License v2.0
 are met.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
 SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
 */
'use strict';
var pkg = require('../../package.json');
var appverse = require ('appverse-generator-commons');
var npmName = require('npm-name');
var _ = require ('lodash');

module.exports = appverse.extend({
  initializing: function () {
     this.conflicter.force = true;
     this.welcome (pkg);
     this.checkVersion();
  },
  prompting: function () {
    var done = this.async();
    var prompts = [{
    name: 'name',
    message: 'Appverse Grunt Plugin Name',
    default : _.kebabCase(this.appname) , // Default to current folder name
    filter: function (value) {
      var done = this.async();
      value = _.kebabCase(value);
      var contribRegex = /^grunt-contrib/;
      if (contribRegex.test(value)) {
        this.error(
          'Removing "contrib" from your project\'s name. The grunt-contrib' +
          '\nnamespace would like to be reserved for tasks maintained by the grunt team.'
        );
        value = value.replace(contribRegex, 'grunt');
      }
      var appverseRegex = /^grunt-appverse-/;
      if (!appverseRegex.test(value)) {
        value = 'grunt-appverse-' + value;
      }
      npmName(value, function (err, available) {
        if (!available) {
          this.waring(value + ' already exists on npm. You might want to use another name.');
        }
        done(value);
      });
    }
  }, {
    name: 'description',
    message: 'Description',
    default: 'The best Grunt plugin ever.'
  }, {
    name: 'version',
    message: 'Version',
    default: '0.0.1'
  }, {
    name: 'authorName',
    message: 'Author name',
    store: true
  }, {
    name: 'authorEmail',
    message: 'Author email',
    store: true
  }, {
    name: 'npmRepository',
    message: 'URL of the NPM Repository in case of private repository usage.',
    default: ''
  }];
    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing: {
    package: function () {
      var targetPackage = {
        name: this.props.name,
        version: '0.0.1',
        description: this.props.description,
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          url: ''
        },
        keywords: [
          'gruntplugin',
          'appverse'
        ],
        main: 'Gruntfile.js',
        license: 'MPL-2.0',
        devDependencies: {
          ['grunt-contrib-clean']: '~0.5.0',
          ['grunt-contrib-jshint']: '~0.8.0',
          ['grunt-contrib-nodeunit']: '~0.3.0',
          ['grunt']: '^0.4.5',
          ['jshint-stylish']: '~0.1.5',
          ['load-grunt-tasks']: '~0.3.0'
        },
        scripts: {
          test: 'grunt test'
        }
    };
    if (this.props.npmRepository) {
      targetPackage.publishConfig =  {
            registry: this.props.npmRepository
      };
    }
    this.fs.write(this.destinationPath('package.json'), JSON.stringify(targetPackage, null, 2));
  },
  projectfiles: function () {
    this.shortName = this.props.name.replace(/^grunt-appverse[\-_]?/, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
    this.moveFiles(this.templatePath(), ['.editorconfig', '.jshintrc', 'test/expected', 'test/fixtures']);
    this.moveTemplates(this.templatePath(), ['Gruntfile.js', 'README.md']);
    //TEMPLATES
    var namedTemplateList = ['tasks/$name.js', 'test/$name_test.js'];
    this.moveNamedTemplates(this.templatePath(),namedTemplateList, this.shortName, this.shortName);
    }
  },
  install: function () {
   this.installDependencies({
     bower: false,
     skipInstall: this.options['skip-install']
   });
 },
 end : function () {
   this.info ('Your grunt plgugin is ready.');
   this.info(' For more information about Grunt plugin best practices,' +
  ' please see the docs at http://gruntjs.com/creating-plugins \n');
  this.info('Execute \'grunt test\' to run the grunt plugin test with nodeunit ');
 }
});
