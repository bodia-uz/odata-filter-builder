import ODataFilterBuilder from '../ODataFilterBuilder';

import { IInputRule } from '../types';

function inputRuleToString(rule: IInputRule): string {
  if (typeof rule === 'function') {
    rule = rule(new ODataFilterBuilder());
  }

  return rule && rule.toString();
}

export default inputRuleToString;