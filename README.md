# [OData Filter Builder](https://bodia-uz.github.io/odata-filter-builder)
`ODataFilterBuilder` is util to build
[$filter part](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html#_Toc406398094)
for
[OData URL query options](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html)

[![npm version](https://img.shields.io/npm/v/odata-filter-builder.svg?style=flat-square)](https://www.npmjs.com/package/odata-filter-builder)
[![Build Status](https://travis-ci.org/bodia-uz/odata-filter-builder.svg?branch=master)](https://travis-ci.org/bodia-uz/odata-filter-builder)
[![Coverage Status](https://coveralls.io/repos/github/bodia-uz/odata-filter-builder/badge.svg?branch=master)](https://coveralls.io/github/bodia-uz/odata-filter-builder?branch=master)

## Documentation
* [`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html) - logical operators
* [`ODataFilterBuilder.filters`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.functions.html) - canonical functions

## Installation

The fastest way to get started is to serve JavaScript from the [unpkg](https://unpkg.com):

```html
<!-- NOTE: See https://unpkg.com how to use specific vesion. -->
<!-- NOTE: not minified version - https://unpkg.com/odata-filter-builder@1.0.0-0/dist/odata-filter-builder.js -->
<script src="https://unpkg.com/odata-filter-builder@1.0.0-0/dist/odata-filter-builder.min.js"></script>
```

```js
// now you can find the library on window.ODataFilterBuilder
var f = ODataFilterBuilder;
```

If you'd like to use [bower](http://bower.io):

```sh
$ bower install --save https://unpkg.com/odata-filter-builder@1.0.0-0/dist/odata-filter-builder.js
```

And it's just as easy with [npm](http://npmjs.com):

```sh
$ npm install --save odata-filter-builder
```
```js
// using ES6 modules
import f from 'odata-filter-builder';
```
```js
// using CommonJS modules
var f = require('odata-filter-builder').ODataFilterBuilder;
```

Also you can try it [in your browser](https://jsbin.com/lovate/edit?html,js,console)

## How to use

### `f([condition='and'])`

Constructor for [`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html) class. Create new instance of filter builder.
Can be used without `new` operator.

| parameter           | type   | description                                |
| ------------------- | ------ | ------------------------------------------ |
| `[condition='and']` | string | _optional:_ base condition ('and'/'or'). |

**Examples**
```js
// can be used without "new" operator
// default base condition is 'and'
f()
 .eq('TypeId', '1')
 .contains(x => x.toLower('Name'), 'a')
 .toString();
// (TypeId eq '1') and (contains(tolower(Name), 'a'))
```
```js
// there are different constructors for 'and' as base condition
// f(), f('and') and f.and()
f('and')
 .eq('Type/Id', 3)
 .eq(x => x.concat(y => y.concat('City',', '), 'Country', false), 'Berlin, Germany')
 .toString();
// (Type/Id eq 3) and (concat(concat(City, ', '), Country) eq 'Berlin, Germany')
```

### `f.or()`

[`ODataFilterBuilder`](https://bodia-uz.github.io/odata-filter-builder/ODataFilterBuilder.html)
constructor alias.
Same as  `f('or')`.
Creates a new OData filter builder with `'or'` as base condition.

**Examples**

```js
// 'or' condition as base condition
f('or')
  .eq(x => x.toLower('Name'), 'foo')
  .eq(x => x.toLower('Name'), 'bar')
  .toString();
// (tolower(Name) eq 'foo') or (tolower(Name) eq 'bar')
```
```js
// combination of 'or' and 'and'
f('or')
  .contains(x => x.toLower('Name'), 'google')
  .contains(x => x.toLower('Name'), 'yandex')
  .and(x => x.eq('Type/Name', 'Search Engine'))
  .toString();
// ((contains(tolower(Name), 'google')) or (contains(tolower(Name), 'yandex'))) and (Type/Name eq 'Search Engine')
```

### More examples
You can find more examples in [test/ODataFilterBuilder_spec.js](https://github.com/bodia-uz/odata-filter-builder/blob/master/test/ODataFilterBuilder_spec.js).

To use with [AngularJS](https://angularjs.org/) see [http://stackoverflow.com/a/36128276/223750](http://stackoverflow.com/a/36128276/223750).

## Build your copy

Clone [repository](https://github.com/bodia-uz/odata-filter-builder) and use npm scripts


### Tests

```sh
$ npm test
$ npm run test:watch
$ npm run test:cov
$ npm run lint
```

### Build

```sh
$ npm run build
```

### JSDoc

```sh
$ npm run jsdoc
```


