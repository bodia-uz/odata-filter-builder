# [OData Filter Builder](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/index.html)

## Documentation
* [OData URL Conventions](http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html)
* Logical operators [ODataFilterBuilder](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/ODataFilterBuilder.html)
* Canonical functions [ODataFilterBuilder.filters](https://htmlpreview.github.io/?https://github.com/bodia-uz/odata-filter-builder/blob/master/jsdoc/ODataFilterBuilder.js.html)

### `ODataFilterBuilder([condition='and'])`

Creates a new ODataFilterBuilder instance.
Can be userd without "new" operator.

Use short name as alias.
```js
const f = ODataFilterBuilder;
// returns "(Id eq 1) and (Foo eq 'Bar')"
f()
  .eq('Id', 1)
  .eq('Foo', 'Bar');
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
 .eq('SubType/Id', '1')
 .toString();
// returns `(TypeId eq '1') and (SubType/Id eq 1)`
```
```js
// 'or' condition as base condition
f('or')
  .eq('TypeId', '1')
  .eq('SubType/Id', '1')
  .toString();
// returns `(TypeId eq '1') or (SubType/Id eq 1)`
```


**Returns** `ODataFilterBuilder`, 


### `f.and()`

Creates new OData filter builder with AND as base condition

### Example

```js
f.and()
 .eq('a', 1)
 .eq('b', 2)
 .toString();
 // return '(a eq 1) and (b eq 2)'
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

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install
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


