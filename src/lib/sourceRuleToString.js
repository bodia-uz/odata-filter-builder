function joinRulesWithCondition(rules, condition) {
  return rules
      .map(r => sourceRuleToString(r, true))
      .join(` ${condition} `);
}

function sourceRuleToString(rule, wrapInParenthesis = false) {
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
