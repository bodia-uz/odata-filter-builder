import reduceSourceWithRule from './lib/reduceSourceWithRule';
import inputRuleToString from './lib/inputRuleToString';
import sourceRuleToString from './lib/sourceRuleToString';

import {
  canonicalFunction,
  contains,
  startsWith,
  endsWith
} from './lib/canonicalFunctions';

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
} from './lib/comparison';

import * as canonicalFunctions from './lib/canonicalFunctions';

import { Condition, IInputField, IInputRule, ISourceRule } from "./types";

function f(condition = Condition.AND): ODataFilterBuilder {
  return new ODataFilterBuilder(condition);
}

/**
 * Creates new {@link ODataFilterBuilder} instance with 'and' as base condition
 * @example
 * and()
 *  .eq('a', 1)
 *  .eq('b', 2)
 *  .toString();
 * // (a eq 1) and (b eq 2)
 */
function and(): ODataFilterBuilder {
  return new ODataFilterBuilder(Condition.AND);
}

/**
 * Create new {@link ODataFilterBuilder} with 'or' as base condition
 * @example
 * or()
 *  .eq('a', 1)
 *  .eq('b', 2)
 *  .toString();
 * // (a eq 1) or (b eq 2)
 */
function or(): ODataFilterBuilder {
  return new ODataFilterBuilder(Condition.OR);
}

class ODataFilterBuilder {
  private _condition: Condition;
  private _source: ISourceRule;

  static and = and;
  static or = or;
  static functions = canonicalFunctions;

  /**
   * creates a ODataFilterBuilder instance
   *
   * @example
   * // default base condition is 'and'
   * new ODataFilterBuilder()
   *  .eq('TypeId', '1')
   *  .eq('SubType/Id', '1')
   *  .toString();
   * // returns `(TypeId eq '1') and (SubType/Id eq 1)`
   *
   * @example
   * // 'or' condition as base condition
   * new ODataFilterBuilder('or')
   *  .eq('TypeId', '1')
   *  .eq('SubType/Id', '1')
   *  .toString();
   * // returns `(TypeId eq '1') or (SubType/Id eq 1)`
   *
   * @param [condition='and'] - base condition ('and' OR 'or').
   */
  constructor(condition = Condition.AND) {
    this._condition = condition;
    this._source = {
      condition: condition,
      rules: []
    };
  }

  /**
   * The 'add' method adds new filter rule with AND or OR condition
   * if condition not provided, source condition is used (AND by default)
   * @param rule - Rule to add
   * @param [condition] - Condition for rule to add(and/or)
   */
  private _add(rule: IInputRule, condition: Condition = this._condition): ODataFilterBuilder {
    // NOTE: if condition not provider, source condition uses
    this._source = reduceSourceWithRule(this._source, inputRuleToString(rule), condition);
    return this;
  }

  /*
   * Logical Operators
   */

  /**
   * Logical And
   * @param rule - Rule to add
   */
  and(rule: IInputRule): ODataFilterBuilder {
    return this._add(rule, Condition.AND);
  }

  /**
   * Logical Or
   * @param rule - Rule to add
   */
  or(rule: IInputRule): ODataFilterBuilder {
    return this._add(rule, Condition.OR);
  }

  /**
   * Logical Negation
   * @param rule - Rule to add
   */
  not(rule: IInputRule): ODataFilterBuilder {
    return this._add(not(rule));
  }

  /**
   * Equal
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  eq(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(eq(field, value, normaliseValue));
  }

  /**
   * Not Equal
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  ne(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(ne(field, value, normaliseValue));
  }

  /**
   * Greater Than
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  gt(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(gt(field, value, normaliseValue));
  }

  /**
   * Greater than or Equal
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  ge(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(ge(field, value, normaliseValue));
  }

  /**
   * Less Than
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  lt(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(lt(field, value, normaliseValue));
  }

  /**
   * Less than or Equal
   * @param field - Field to compare
   * @param value - A value to compare with
   * @param normaliseValue - Convert string "value" to "'value'" or not. (Convert by default)
   */
  le(field: IInputField, value, normaliseValue: boolean = true): ODataFilterBuilder {
    return this._add(le(field, value, normaliseValue));
  }

  /**
   * @param field - Field to compare
   * @param values - Values to compare with
   * @param normaliseValues - Convert string "value" to "'value'" or not. (Convert by default)
   */
  in(field: IInputField, values: any | any[], normaliseValues: boolean = true): ODataFilterBuilder {
    return this._add(compareIn(field, values, normaliseValues));
  }

  /**
   * @param field - Field to compare
   * @param values - Values to compare with
   * @param normaliseValues - Convert string "value" to "'value'" or not. (Convert by default)
   */
  notIn(field: IInputField, values: any | any[], normaliseValues: boolean = true): ODataFilterBuilder {
    return this._add(compareNotIn(field, values, normaliseValues));
  }

  // Canonical Functions

  /**
   * The contains function returns true if the second parameter string value is a substring of the first parameter string value.
   * @param field - Field to compare
   * @param value - Value to compare
   */
  contains(field: IInputField, value: string): ODataFilterBuilder {
    return this._add(contains(field, value));
  }

  /**
   * The startswith function returns true if the first parameter string value starts with the second parameter string value.
   * @param field - Field to compare
   * @param value - Value to compare
   */
  startsWith(field: IInputField, value: string): ODataFilterBuilder {
    return this._add(startsWith(field, value));
  }

  /**
   * The endswith function returns true if the first parameter string value ends with the second parameter string value.
   * @param field - Field to compare
   * @param value - Value to compare
   */
  endsWith(field: IInputField, value: string): ODataFilterBuilder {
    return this._add(endsWith(field, value));
  }

  /**
   * Custom function
   * @param functionName - Name of generated function
   * @param field - The first function parameter
   * @param values - The second function parameter
   * @param normaliseValues - Convert string "value" to "'value'" or not. (Convert by default)
   * @param reverse - Swap field and value params in output. (Don't swap by default)
   */
  fn(functionName: string, field: IInputField, values: any | any[], normaliseValues: boolean = true, reverse: boolean = false): ODataFilterBuilder {
    return this._add(canonicalFunction(functionName, field, values, normaliseValues, reverse));
  }

  isEmpty(): boolean {
    return this._source.rules.length === 0;
  }

  /**
   * Convert filter builder instance to string
   * @returns A source string representation
   */
  toString(): string {
    return sourceRuleToString(this._source);
  }
}

export {
  f,
  and,
  or,
  canonicalFunctions,
  ODataFilterBuilder
};

export default ODataFilterBuilder;