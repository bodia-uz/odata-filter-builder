import inputFieldToString from './inputFieldToString';
import normalise from './normaliseValue';

function canonicalFunction(functionName, field, values, normaliseValues = true, reverse = false) {
  // make sure that field is string
  field = inputFieldToString(field);

  if (typeof values === 'undefined') {
    values = [];
  } else if (!Array.isArray(values)) {
    values = [values];
  }

  if (values.length === 0) {
    return `${functionName}(${field})`;
  }

  if (normaliseValues) {
    values = values.map(normalise);
  }

  const functionArgs = !reverse ? [field, ...values]: [...values, field];

  return `${functionName}(${functionArgs.join(', ')})`;
}

function contains(field, value) {
  return canonicalFunction('contains', field, value);
}

function startsWith(field, value) {
  return canonicalFunction('startswith', field, value);
}

function endsWith(field, value) {
  return canonicalFunction('endswith', field, value);
}

/**
 * The tolower function returns the input parameter string value with all uppercase characters converted to lowercase.
 * @example
 * f().eq(x => x.toLower('CompanyName'), 'alfreds futterkiste')
 * // tolower(CompanyName) eq 'alfreds futterkiste'
 * @param {string|InputFieldExpression} field - Field
 * @returns {string} A function string
 */
function toLower(field) {
  return canonicalFunction('tolower', field);
}

/**
 * The toupper function returns the input parameter string value with all lowercase characters converted to uppercase.
 * @example
 * f().eq(x => x.toUpper('CompanyName'), 'ALFREDS FUTTERKISTE')
 * // toupper(CompanyName) eq 'ALFREDS FUTTERKISTE'
 * @param {string|InputFieldExpression} field - Field
 * @returns {string} A function string
 */
function toUpper(field) {
  return canonicalFunction('toupper', field);
}

/**
 * The trim function returns the input parameter string value with all leading and trailing whitespace characters, removed.
 * @example
 * f().eq(x => x.trim('CompanyName'), 'CompanyName')
 * // trim(CompanyName) eq CompanyName
 * @param {string|InputFieldExpression} field - Field
 * @returns {string} A function string
 */
function trim(field) {
  return canonicalFunction('trim', field);
}

/**
 * @example
 * f().eq(f.functions.substring('CompanyName', 1), 'lfreds Futterkiste');
 * f().eq(x => x.substring('CompanyName', 1), 'lfreds Futterkiste');
 * // substring(CompanyName, 1) eq 'lfreds Futterkiste'
 *
 * @example
 * f().eq(x => x.substring('CompanyName', 1, 2), 'lf').toString();
 * f().eq(f.functions.substring('CompanyName', 1, 2), 'lf')
 * // substring(CompanyName, 1, 2) eq 'lf'
 *
 * @param {string|InputFieldExpression} field - The first function parameter
 * @param {...number} values - Second or second and third function parameters
 *
 * @returns {string} A function string
 */
function substring(field, ...values) {
  return canonicalFunction('substring', field, values);
}

/**
 * @param {string|InputFieldExpression} field - The first function parameter
 * @param {string} value - The second function parameter
 * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
 * @example
 * f().eq(x => x.concat(y => y.concat('City',', '), 'Country', false), 'Berlin, Germany');
 * // concat(concat(City, ', '), 'Country') eq 'Berlin, Germany'
 * @returns {string} A function string
 */
function concat(field, value, normaliseValue) {
  return canonicalFunction('concat', field, [value], normaliseValue);
}

/**
 * The length function returns the number of characters in the parameter value.
 * @example
 * f().eq(x => x.length('CompanyName'), 19)
 * // length(CompanyName) eq 19
 * @param {string|InputFieldExpression} field - Field
 * @returns {string} A function string
 */
function length(field) {
  return canonicalFunction('length', field);
}

/**
 * The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.
 * @example
 * f().eq(f.functions.indexOf('CompanyName', 'lfreds'), 1)
 * f().eq(x => x.indexOf('CompanyName', 'lfreds'), 1)
 * // indexof(CompanyName,'lfreds') eq 1
 *
 * @param {string|InputFieldExpression} field - The first function parameter
 * @param {string} value - The second function parameter
 *
 * @returns {string} A function string
 */
function indexOf(field, value) {
  return canonicalFunction('indexof', field, [value]);
}

export {
    canonicalFunction,
    // logical
    contains,
    startsWith,
    endsWith,
    // transform string
    toLower,
    toUpper,
    trim,
    substring,
    concat,
    // other
    length,
    indexOf
};
