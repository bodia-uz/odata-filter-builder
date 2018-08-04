import inputFieldToString from './inputFieldToString';
import normalise from './normaliseValue';

import { IInputField } from '../types';

function canonicalFunction(functionName: string, field: IInputField, values?, normaliseValues: boolean = true, reverse: boolean = false) {
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

function contains(field: IInputField, value: string): string {
  return canonicalFunction('contains', field, value);
}

function startsWith(field: IInputField, value: string): string {
  return canonicalFunction('startswith', field, value);
}

function endsWith(field: IInputField, value: string): string {
  return canonicalFunction('endswith', field, value);
}

/**
 * The tolower function returns the input parameter string value with all uppercase characters converted to lowercase.
 * @example
 * f().eq(x => x.toLower('CompanyName'), 'alfreds futterkiste')
 * // tolower(CompanyName) eq 'alfreds futterkiste'
 * @param field - Field
 * @returns A function string
 */
function toLower(field: IInputField): string {
  return canonicalFunction('tolower', field);
}

/**
 * The toupper function returns the input parameter string value with all lowercase characters converted to uppercase.
 * @example
 * f().eq(x => x.toUpper('CompanyName'), 'ALFREDS FUTTERKISTE')
 * // toupper(CompanyName) eq 'ALFREDS FUTTERKISTE'
 * @param field - Field
 * @returns A function string
 */
function toUpper(field: IInputField): string {
  return canonicalFunction('toupper', field);
}

/**
 * The trim function returns the input parameter string value with all leading and trailing whitespace characters, removed.
 * @example
 * f().eq(x => x.trim('CompanyName'), 'CompanyName')
 * // trim(CompanyName) eq CompanyName
 * @param field - Field
 * @returns A function string
 */
function trim(field: IInputField): string {
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
 * @param field - The first function parameter
 * @param values - Second or second and third function parameters
 *
 * @returns A function string
 */
function substring(field: IInputField, ...values: number[]): string {
  return canonicalFunction('substring', field, values);
}

/**
 * @param field - The first function parameter
 * @param value - The second function parameter
 * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
 * @example
 * f().eq(x => x.concat(y => y.concat('City',', '), 'Country', false), 'Berlin, Germany');
 * // concat(concat(City, ', '), 'Country') eq 'Berlin, Germany'
 * @returns A function string
 */
function concat(field: IInputField, value: string, normaliseValue?: boolean): string {
  return canonicalFunction('concat', field, [value], normaliseValue);
}

/**
 * The length function returns the number of characters in the parameter value.
 * @example
 * f().eq(x => x.length('CompanyName'), 19)
 * // length(CompanyName) eq 19
 * @param field - Field
 * @returns A function string
 */
function length(field: IInputField): string {
  return canonicalFunction('length', field);
}

/**
 * The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.
 * @example
 * f().eq(f.functions.indexOf('CompanyName', 'lfreds'), 1)
 * f().eq(x => x.indexOf('CompanyName', 'lfreds'), 1)
 * // indexof(CompanyName,'lfreds') eq 1
 *
 * @param field - The first function parameter
 * @param value - The second function parameter
 *
 * @returns A function string
 */
function indexOf(field: IInputField, value: string): string {
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
