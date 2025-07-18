const CONDITION_PRECEDENCE = {
  or: 1,
  and: 2
};

function joinRulesWithCondition(rules, condition) {
  return rules
      .map(r => sourceRuleToString(r, condition))
      .join(` ${condition} `);
}

function sourceRuleToString(rule, parentCondition) {
  if (typeof rule !== 'string') {
    // if child rules more then one join child rules by condition
    const ruleString = (
        rule.rules.length === 1
            ? sourceRuleToString(rule.rules[0], rule.condition)
            : joinRulesWithCondition(rule.rules, rule.condition)
    );

    if (
        parentCondition &&
        CONDITION_PRECEDENCE[parentCondition] > CONDITION_PRECEDENCE[rule.condition] &&
        rule.rules.length > 1
    ) {
      return `(${ruleString})`;
    }

    return ruleString;
  }

  return rule;
}

export default sourceRuleToString;
