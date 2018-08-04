import { Condition, ISourceRule } from '../types';

function joinRulesWithCondition(rules: (string | ISourceRule)[], condition: Condition): string {
  return rules
      .map(r => sourceRuleToString(r, true))
      .join(` ${condition} `);
}

function sourceRuleToString(rule: string | ISourceRule, wrapInParenthesis: boolean = false): string {
  if (typeof rule !== 'string') {
    // if child rules more then one join child rules by condition
    // and wrap in brackets every child rule
    rule = (
        rule.rules.length === 1
            ? sourceRuleToString(rule.rules[0])
            : joinRulesWithCondition(rule.rules, rule.condition)
    );
  }

  return wrapInParenthesis ? `(${rule})` : rule;
}

export default sourceRuleToString;
