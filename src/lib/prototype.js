import { ODataFilterBuilder } from './constructor';

import reduceSourceWithRule from './reduceSourceWithRule';
import inputRuleToString from './inputRuleToString';
import sourceRuleToString from './sourceRuleToString';

import {
    contains,
    startsWith,
    endsWith
} from './canonicalFunctions';

import {
    not,
    eq,
    ne,
    gt,
    ge,
    lt,
    le,
    compareIn,
    compareNotIn
} from './comparison';

const proto = {
  constructor: ODataFilterBuilder,

  /**
   * The 'add' method adds new filter rule with AND or OR condition
   * if condition not provided. Source condition is used (AND by default)
   * @this {ODataFilterBuilder}
   * @param {string|ODataFilterBuilder|InputRuleExpression} rule - Rule to add
   * @param {string} [condition] - Condition for rule to add(and/or)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   * @private
   */
  _add(rule, condition = this._condition) {
    // NOTE: if condition not provider, source condition uses
    this._source = reduceSourceWithRule(this._source, inputRuleToString(rule), condition);
    return this;
  },


  /*
   * Logical Operators
   */

  /**
   * Logical And
   * @param {string|ODataFilterBuilder|InputRuleExpression} rule - Rule to add
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  and(rule) {
    return this._add(rule, 'and');
  },

  /**
   * Logical Or
   * @param {string|ODataFilterBuilder|InputRuleExpression} rule - Rule to add
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  or(rule) {
    return this._add(rule, 'or');
  },

  /**
   * Logical Negation
   * @param {string|ODataFilterBuilder|InputRuleExpression} rule - Rule to add
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  not(rule) {
    return this._add(not(rule));
  },

  /**
   * Equal
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  eq(field, value, normaliseValue) {
    return this._add(eq(field, value, normaliseValue));
  },

  /**
   * Not Equal
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  ne(field, value, normaliseValue) {
    return this._add(ne(field, value, normaliseValue));
  },

  /**
   * Greater Than
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  gt(field, value, normaliseValue) {
    return this._add(gt(field, value, normaliseValue));
  },

  /**
   * Greater than or Equal
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  ge(field, value, normaliseValue) {
    return this._add(ge(field, value, normaliseValue));
  },

  /**
   * Less Than
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  lt(field, value, normaliseValue) {
    return this._add(lt(field, value, normaliseValue));
  },

  /**
   * Less than or Equal
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string|number|*} value - A value to compare with
   * @param {boolean} [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  le(field, value, normaliseValue) {
    return this._add(le(field, value, normaliseValue));
  },

  /**
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string[]|string} values - Values to compare with
   * @param {boolean} [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  in(field, values, normaliseValues) {
    return this._add(compareIn(field, values, normaliseValues));
  },

  /**
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {Array} values - Values to compare with
   * @param {boolean} [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  notIn(field, values, normaliseValues) {
    return this._add(compareNotIn(field, values, normaliseValues));
  },

  // Canonical Functions

  /**
   * The contains function returns true if the second parameter string value is a substring of the first parameter string value.
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string} value - Value to compare
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  contains(field, value) {
    return this._add(contains(field, value));
  },

  /**
   * The startswith function returns true if the first parameter string value starts with the second parameter string value.
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string} value - Value to compare
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  startsWith(field, value) {
    return this._add(startsWith(field, value));
  },

  /**
   * The endswith function returns true if the first parameter string value ends with the second parameter string value.
   * @param {string|InputFieldExpression} field - Field to compare
   * @param {string} value - Value to compare
   * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance
   */
  endsWith(field, value) {
    return this._add(endsWith(field, value));
  },

  isEmpty() {
    return this._source.rules.length === 0;
  },

  /**
   * Convert filter builder instance to string
   * @this {ODataFilterBuilder}
   * @returns {string} A source string representation
   */
  toString() {
    return sourceRuleToString(this._source);
  }
};

export default proto;