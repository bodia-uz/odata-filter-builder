import inputFieldToString from './inputFieldToString';
import inputRuleToString from './inputRuleToString';
import normalise from './normaliseValue';

import { Condition, IInputField, IInputRule } from '../types';

function not(rule: IInputRule): string {
  const ruleString = inputRuleToString(rule);
  if (ruleString) {
    return `not (${ruleString})`;
  }
}

function compare(field: IInputField, operator: string, value: any, normaliseValue: boolean = true): string {
  // make sure that field is string
  field = inputFieldToString(field);

  if (normaliseValue) {
    value = normalise(value);
  }

  return `${field} ${operator} ${value}`;
}

function compareMap(field: IInputField, operator: string, values: any | any[], normaliseValues: boolean = true): string[] {
  if (!values) {
    return [];
  }

  // make sure that field is string
  field = inputFieldToString(field);

  if (!Array.isArray(values)) {
    return [compare(field, operator, values, normaliseValues)];
  }

  return values.map(value => compare(field, operator, value, normaliseValues));
}

function eq(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'eq', value, normaliseValue);
}

function ne(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'ne', value, normaliseValue);
}

function gt(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'gt', value, normaliseValue);
}

function ge(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'ge', value, normaliseValue);
}

function lt(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'lt', value, normaliseValue);
}

function le(field: IInputField, value, normaliseValue: boolean) {
  return compare(field, 'le', value, normaliseValue);
}

function joinRules(rules: string[], condition: Condition) {
  return rules.join(` ${condition} `);
}

function compareIn(field: IInputField, values: any | any[], normaliseValues: boolean) {
  return joinRules(compareMap(field, 'eq', values, normaliseValues), Condition.OR);
}

function compareNotIn(field: IInputField, values: any | any[], normaliseValues: boolean) {
  // return joinRules(compareMap(field, 'ne', values, normaliseValues), 'and')
  return not(compareIn(field, values, normaliseValues));
}

export {
    not,
    compare,
    compareMap,
    eq,
    ne,
    gt,
    ge,
    lt,
    le,
    compareIn,
    compareNotIn
};
