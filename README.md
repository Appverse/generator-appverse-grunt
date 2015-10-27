## [Appverse Grunt](http://appverse.org/)
![](http://appversed.files.wordpress.com/2012/12/logo.png)

![](https://img.shields.io/npm/v/generator-appverse-grunt.svg) ![](https://img.shields.io/npm/dm/generator-appverse-grunt.svg) ![](https://img.shields.io/npm/l/generator-appverse-grunt.svg)
[![Dependency Status](https://img.shields.io/david/appverse/generator-appverse-grunt.svg?style=flat-square)](https://david-dm.org/appverse/generator-appverse-grunt)
[![devDependency Status](https://img.shields.io/david/dev/appverse/generator-appverse-grunt.svg?style=flat-square)](https://david-dm.org/appverse/generator-appverse-grunt#info=devDependencies)
[![Inline docs](http://inch-ci.org/github/appverse/generator-appverse-grunt.svg)](http://inch-ci.org/github/appverse/generator-appverse-grunt)

# generator-appverse-grunt
The Appverse Grunt [Yeoman](http://yeoman.io) Generator allows to package and deploy your project Grunt tasks.
Forked from the [generator-gruntplugin](https://github.com/yeoman/generator-gruntplugin) project.

## Usage
To install generator-appverse-grunt from npm, run:

```bash
npm install -g generator-appverse-grunt
```
Create a new folder for your project

```bash
mkdir mytask
```

```bash
cd mytask
```

Finally, initiate the generator:

```bash
yo appverse-grunt
```

The generator will build the package name for you using *grunt-appverse* prefix, so the final package name will be *grunt-appverse-mytask*.
Moreover, it will add some [nodeunit](https://github.com/caolan/nodeunit) test samples to the generated project. You can execute them using:

```bash
grunt test
```


## License

Copyright (c) 2012 GFT Appverse, S.L., Sociedad Unipersonal.

 This Source  Code Form  is subject to the  terms of  the Appverse Public License
 Version 2.0  ("APL v2.0").  If a copy of  the APL  was not  distributed with this
 file, You can obtain one at <http://appverse.org/legal/appverse-license/>.

 Redistribution and use in  source and binary forms, with or without modification,
 are permitted provided that the  conditions  of the  AppVerse Public License v2.0
 are met.

 THIS SOFTWARE IS PROVIDED BY THE  COPYRIGHT HOLDERS  AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS  OR IMPLIED WARRANTIES, INCLUDING, BUT  NOT LIMITED TO,   THE IMPLIED
 WARRANTIES   OF  MERCHANTABILITY   AND   FITNESS   FOR A PARTICULAR  PURPOSE  ARE
 DISCLAIMED. EXCEPT IN CASE OF WILLFUL MISCONDUCT OR GROSS NEGLIGENCE, IN NO EVENT
 SHALL THE  COPYRIGHT OWNER  OR  CONTRIBUTORS  BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL,  SPECIAL,   EXEMPLARY,  OR CONSEQUENTIAL DAMAGES  (INCLUDING, BUT NOT
 LIMITED TO,  PROCUREMENT OF SUBSTITUTE  GOODS OR SERVICES;  LOSS OF USE, DATA, OR
 PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING  IN  ANY WAY OUT  OF THE USE  OF THIS  SOFTWARE,  EVEN  IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.
