import ODataFilterBuilder from './ODataFilterBuilder';
import * as canonicalFunctions from './lib/canonicalFunctions';

enum Condition {
  AND = 'and',
  OR = 'or',
}

/**
 * The comparison field lambda expression
 * @example
 * f()
 *  .and(x => x.eq('Type/Id', 1))
 *  .and(x => x.contains('Name', 'a'))
 *  .toString();
 * // (Type/Id eq 1) and (contains(Name, 'a'))
 */
type IInputFieldExpression = (x: typeof canonicalFunctions) => string;

/**
 * The comparison rule lambda expression
 * @example
 * f()
 *  .and(x => x.eq('Type/Id', 1))
 *  .and(x => x.contains('Name', 'a'))
 *  .toString();
 * // (Type/Id eq 1) and (contains(Name, 'a'))
 */
type IInputRuleExpression = (x: ODataFilterBuilder) => ODataFilterBuilder;

type IInputField = string | IInputFieldExpression;
type IInputRule = string | ODataFilterBuilder | IInputRuleExpression;

type ISourceRule = {
  condition: Condition;
  rules: (string | ISourceRule)[];
};

export {
  Condition,
  IInputField,
  IInputRule,
  ISourceRule,
};