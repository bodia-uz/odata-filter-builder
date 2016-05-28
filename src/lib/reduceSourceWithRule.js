/**
 * Reduce source with new rule and/or condition
 * @param {Object} source - Source rule
 * @param {Object|string} rule - Rule to add
 * @param {string} [condition] - Condition for rule to add(and/or)
 * @returns {Object} updated rule
 * @private
 */
function reduceSourceWithRule(source, rule, condition) {
  if (rule) {
    if (condition && source.condition !== condition) {
      // if source rules condition different from rule condition
      // update source condition

      source = {
        condition: condition,
        // if has more then one rules
        // regroup source rules tree
        rules: source.rules.length > 1 ? [source] : source.rules
      };
    }

    // add new rule
    source.rules.push(rule);
  }
  return source;
}

export default reduceSourceWithRule;