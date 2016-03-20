# [OData Filter Builder](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/index.html)

## Documentation
* [OData URL Conventions](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html)
* Logical operators [ODataFilterBuilder](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/ODataFilterBuilder.html)
* Canonical functions [ODataFilterBuilder.filters](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/ODataFilterBuilder.js.html)
* Try it [in your browser.](https://jsbin.com/lafutap/edit?html,js,console)

### `ODataFilterBuilder([condition='and'])`

Creates a new ODataFilterBuilder instance.
Can be userd without "new" operator.

Use short name as alias.
```js
// var f = require('odata-filter-builder');
// import f from 'odata-filter-builder';
const f = ODataFilterBuilder;

f()
  .eq('Id', 1)
  .eq('Foo', 'Bar');
// (Id eq 1) and (Foo eq 'Bar')
```

### Parameters

| parameter           | type   | description                            |
| ------------------- | ------ | -------------------------------------- |
| `[condition='and']` | string | _optional:_ - base condition (and/or). |


### Example

```js
// use short name as alias
const f = ODataFilterBuilder;
```
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

**Returns** `ODataFilterBuilder`, 


### `f.and()`

Creates new OData filter builder with AND as base condition

### Example

```js
f.and()
 .eq('Type/Id', 3)
 .eq(x => x.concat(y => y.concat('City',', '), 'Country', false), 'Berlin, Germany')
 .toString();
// (Type/Id eq 3) and (concat(concat(City, ', '), Country) eq 'Berlin, Germany')
```


**Returns** `ODataFilterBuilder`, returns new ODataFilterBuilder instance with AND as base condition


### `f.or()`

Create new OData filter builder with OR as base condition

### Example

```js
// return '(a eq 1) or (b eq 2)'
f.or()
 .eq('a', 1)
 .eq('b', 2)
 .toString();
```


**Returns** `ODataFilterBuilder`, returns new ODataFilterBuilder instance with OR as base condition


## Installation

The fastest way to get started is to serve JavaScript from the [npmcdn](https://npmcdn.com):

```html
<script src="https://npmcdn.com/odata-filter-builder/dist/odata-filter-builder.js"></script>
```

Minified:

```html
<script src="https://npmcdn.com/odata-filter-builder/dist/odata-filter-builder.min.js"></script>
```

Version or [version range](https://npmcdn.com):

```html
<script src="https://npmcdn.com/odata-filter-builder@0.0.3/dist/odata-filter-builder.js"></script>
```

If you'd like to use [bower](http://bower.io):

```sh
$ bower install --save https://npmcdn.com/odata-filter-builder@^0.0/dist/odata-filter-builder.js --save
```
And it's just as easy with [npm](http://npmjs.com):

```sh
$ npm i --save odata-filter-builder
```

## Tests

```sh
$ npm test
$ npm run test:watch
$ npm run test:cov
$ npm run lint
```

## Bild

```sh
$ npm run build
```

## JSDoc

```sh
$ npm run jsdoc
```


