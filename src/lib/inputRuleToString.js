import { ODataFilterBuilder } from './constructor';

function inputRuleToString(rule) {
  if (typeof rule === 'function') {
    rule = rule(new ODataFilterBuilder());
  }

  return rule && rule.toString();
}

export default inputRuleToString;