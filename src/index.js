const AND = 'and';
const OR = 'or';

/**
 * comparison field lambda expression
 * @example
 * // returns 'tolower(Translation/Ru) eq 'a''
 * f()
 *  .eq(x => x.tolower('Translation/Ru'), 'a');
 * @callback ODataFilterBuilder~fieldLambdaExpression
 * @params {ODataFilterBuilder.functions}
 * @returns  {string}
 */

/**
 * comparison rule lambda expression
 * @example
 * // returns '(Type/Id eq 1) and (contains(Name, 'a'))'
 * f()
 *  .and(x => x.eq('Type/Id', 1))
 *  .and(x => x.contains('Name', 'a'));
 * @callback ODataFilterBuilder~ruleLambdaExpression
 * @params {ODataFilterBuilder}
 * @returns  {ODataFilterBuilder}
 */

/**
 * comparison input rule
 * @typedef {string|ODataFilterBuilder|ODataFilterBuilder~ruleLambdaExpression} ODataFilterBuilder~InputRule
 * @example
 * f().and(inputRule)
 * // string
 * f().and('Id eq 1');
 * // ODataFilterBuilder
 * f().and(f().eq('Id', 1));
 * // ruleLambdaExpression
 * f().and(x => x.eq('Id', 1));
 */

/**
 * comparison input field
 * @typedef {string|ODataFilterBuilder~fieldLambdaExpression} ODataFilterBuilder~InputField
 * @example
 * // returns 'contains(tolower(Translation/Ru), 'a')
 * f().contains(inputField, 'a')
 *
 * // string
 * f().contains('tolower(Translation/Ru)', 'a');
 * // fieldLambdaExpression
 * f().contains(x => x.tolower('Name', ''), 'a');
 */

/**
 * Reduce source with new rule and/or condition
 * @param {Object} source
 * @param {string} source.condition
 * @param {Array} source.rules
 * @param {Object|string} rule
 * @param {string} [condition] (and/or)
 * @returns {Object}
 * @private
 */
function _add(source, rule, condition) {
  if (rule) {
    if (condition && source.condition !== condition) {
      // if source rules condition different from rule condition
      // and source has more then one rules
      // regroup source rules tree
      if (source.rules.length > 1) {
        source = {rules: [source]};
      }

      // update source condition
      source.condition = condition;
    }

    // add new rule
    source.rules.push(rule);
  }
  return source;
}

function _normilise(value) {
  return typeof value === 'string' ? `'${value}'` : value;
}

/**
 * Negate rule
 * @param {ODataFilterBuilder~InputRule} rule
 * @private
 */
function _not(rule) {
  const ruleString = _inputRuleToString(rule);
  if (ruleString) {
    return `not (${ruleString})`;
  }
}

/**
 * @param {string} functionName - function name
 * @param {string} field - field name
 * @param {...*} [values] - zero or more function values
 * @returns {string}
 * @private
 */
function _function(functionName, field, values) {
  if (arguments.length === 2) {
    return `${functionName}(${field})`;
  }

  values = Array.prototype
      .slice.call(arguments, 2)
      .map(_normilise)
      .join(', ');

  return `${functionName}(${field}, ${values})`;
}

/**
 * @param {ODataFilterBuilder~InputField} field
 * @param {string} operator
 * @param {string|number|*} value
 * @returns {string}
 * @private
 */
function _compare(field, operator, value) {
  // make sure that field is string
  field = _inputFieldToString(field);

  return `${field} ${operator} ${_normilise(value)}`;
}

function _compareMap(field, operator, values) {
  if (!values) {
    return [];
  }

  // make sure that field is string
  field = _inputFieldToString(field);

  if (!Array.isArray(values)) {
    return [_compare(field, operator, values)];
  }

  return values.map(v => _compare(field, operator, v));
}

function _joinRules(rules, condition) {
  return rules.join(` ${condition} `);
}

/**
 * Convert source rule to string
 * @param {Object|string} rule
 * @param {boolean} [wrapInParenthesis=false]
 * @returns {string}
 * @private
 */
function _sourceRuleToString(rule, wrapInParenthesis = false) {
  if (typeof rule !== 'string') {
    // if child rules more then one join child rules by condition
    // and wrap in brackets every child rule
    rule = (
        rule.rules.length === 1
            ? _sourceRuleToString(rule.rules[0])
            : _joinRules(rule.rules.map(r => _sourceRuleToString(r, true)), rule.condition)
    );
  }

  return wrapInParenthesis ? `(${rule})` : rule;
}

/**
 * Convert input rule to string
 * @param {ODataFilterBuilder~InputRule} rule
 * @private
 */
function _inputRuleToString(rule) {
  if (typeof rule === 'function') {
    rule = rule(new ODataFilterBuilder());
  }

  return rule && rule.toString();
}

/**
 * Convert input field to string if field is lambda expression
 * @param {ODataFilterBuilder~InputField} field
 * @example
 * // returns tolower(Name)
 * _inputFieldToString(x => x.tolower('Name'));
 * _inputFieldToString('tolower(Name)');
 * @private
 */
function _inputFieldToString(field) {
  return typeof field === 'function' ? field(ODataFilterFunctions) : field;
}

/**
 * Creates a new ODataFilterBuilder instance.
 * Can be userd without "new" operator
 * @class
 * @classdesc ODataFilterBuilder is util
 * to build {@link http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html#_Toc406398094|$filter part}
 * for OData query options.
 * @see {@link http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html|OData URL Conventions} for further information.
 * @param {string} [condition='and'] - base condition (and/or).
 * @example
 * // use short name as alias
 * const f = ODataFilterBuilder;
 * // can be used without "new" operator
 * // return Id eq '1'
 * f().eq('Id', '1');
 * @returns {ODataFilterBuilder}
 */
function ODataFilterBuilder(condition = AND) {
  if (!(this instanceof ODataFilterBuilder)) {
    return new ODataFilterBuilder(condition);
  }

  this.condition = condition;
  this.source = {
    condition: condition,
    rules: []
  };
}

/**
 * Creates new OData filter builder with AND as base condition
 * @example
 * // return '(a eq 1) and (b eq 2)'
 * f.and()
 *  .eq('a', 1)
 *  .eq('b', 2)
 *  .toString();
 *  @returns {ODataFilterBuilder} returns new ODataFilterBuilder instance with AND as base condition
 */
ODataFilterBuilder.and = () => new ODataFilterBuilder(AND);

/**
 * Create new OData filter builder with OR as base condition
 * @example
 * // return '(a eq 1) or (b eq 2)'
 * f.or()
 *  .eq('a', 1)
 *  .eq('b', 2)
 *  .toString();
 *  @returns {ODataFilterBuilder} returns new ODataFilterBuilder instance with OR as base condition
 */
ODataFilterBuilder.or = () => new ODataFilterBuilder(OR);

/**
 * Canonical Functions
 * @type ODataFilterBuilder.functions
 */
ODataFilterBuilder.functions = {
  /**
   * The length function returns the number of characters in the parameter value.
   * @example
   * // return length(CompanyName) eq 19
   * f().eq(x => x.length('CompanyName'), 19)
   * @param {string} field
   * @memberof ODataFilterBuilder.func
   * @returns {string}
   */
  length(field) {
    return _function('length', field);
  },

  /**
   * The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.
   * @example
   * // indexof(CompanyName,'lfreds') eq 1
   * f().eq(f.func.indexof('CompanyName', 'lfreds'), 1)
   * @param {string} field
   * @param {string} value
   * @returns {string}
   */
  indexof(field, value) {
    return _function('indexof', field, value);
  },

  substring(field, value1, value2) {
    return _function('substring', field, value1, value2);
  }
};;

ODataFilterBuilder.prototype = {
  /**
   * The 'add' method adds new filter rule with AND or OR condition
   * if condition not provided. Source condition is used (AND by default)
   * @this {ODataFilterBuilder}
   * @param {ODataFilterBuilder~InputRule} rule
   * @param {string} [condition=base condition]
   * @private
   * @returns {ODataFilterBuilder}
   */
  _add(rule, condition = this.condition) {
    // NOTE: if condition not provider, source condition uses
    this.source = _add(this.source, _inputRuleToString(rule), condition);
    return this;
  },

  /*
   * Logical Operators
   */

  /**
   * Logical And
   * @param {ODataFilterBuilder~InputRule} rule
   * @returns {ODataFilterBuilder}
   */
  and(rule) {
    return this._add(rule, AND);
  },

  /**
   * Logical Or
   * @param {ODataFilterBuilder~InputRule} rule
   * @returns {ODataFilterBuilder}
   */
  or(rule) {
    return this._add(rule, OR);
  },

  /**
   * Logical Negation
   * @param {ODataFilterBuilder~InputRule} rule
   * @returns {ODataFilterBuilder}
   */
  not(rule) {
    return this._add(_not(rule));
  },

  /**
   * Logical compare field and value by operator
   * @param {ODataFilterBuilder~InputField} field
   * @param {string} operator
   * @param {string|number|*} value
   * @private
   * @returns {ODataFilterBuilder}
   */
  _compare(field, operator, value) {
    return this._add(_compare(field, operator, value));
  },

  /**
   * Equal
   * @param {ODataFilterBuilder~InputField} field - Field Name
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  eq(field, value) {
    return this._compare(field, 'eq', value);
  },

  /**
   * Not Equal
   * @param {ODataFilterBuilder~InputField} field
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  ne(field, value) {
    return this._compare(field, 'ne', value);
  },

  /**
   * Greater Than
   * @param {ODataFilterBuilder~InputField} field
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  gt(field, value) {
    return this._compare(field, 'gt', value);
  },

  /**
   * Greater than or Equal
   * @param {ODataFilterBuilder~InputField} field
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  ge(field, value) {
    return this._compare(field, 'ge', value);
  },

  /**
   * Less Than
   * @param {ODataFilterBuilder~InputField} field
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  lt(field, value) {
    return this._compare(field, 'lt', value);
  },

  /**
   * Less than or Equal
   * @param {ODataFilterBuilder~InputField} field
   * @param {string|number|*} value
   * @returns {ODataFilterBuilder}
   */
  le(field, value) {
    return this._compare(field, 'le', value);
  },

  /**
   * @param {ODataFilterBuilder~InputField} field
   * @param {string[]|string} values
   * @returns {ODataFilterBuilder}
   */
  in(field, values) {
    return this._add(_joinRules(_compareMap(field, 'eq', values), OR));
  },

  /**
   * @param {ODataFilterBuilder~InputField} field
   * @param {string[]|string} values
   * @returns {ODataFilterBuilder}
   */
  notIn(field, values) {
    return this._add(_joinRules(_compareMap(field, 'ne', values), AND));
  },

  /**
   * Canonical Functions
   */

  /**
   * The contains function returns true if the second parameter string value is a substring of the first parameter string value.
   * @example
   * // return contains(CompanyName, 'Alfreds')
   * @param {ODataFilterBuilder~InputField} field
   * @param {string} value
   * @returns {ODataFilterBuilder}
   */
  contains(field, value) {
    return this._add(_function('contains', field, value));
  },

  /**
   * The startswith function returns true if the first parameter string value starts with the second parameter string value.
   * @example
   * // return startswith(CompanyName,'Alfr')
   * @param {ODataFilterBuilder~InputField} field
   * @param {string} value
   * @returns {ODataFilterBuilder}
   */
  startswith(field, value) {
    return this._add(_function('startswith', field, value));
  },

  /**
   * The endswith function returns true if the first parameter string value ends with the second parameter string value.
   * @example
   * // return endswith(CompanyName,'Futterkiste')
   * @param {ODataFilterBuilder~InputField} field
   * @param {string} value
   * @returns {ODataFilterBuilder}
   */
  endswith(field, value) {
    return this._add(_function('endswith', field, value));
  },

  /**
   * Convert filter builder instance to string
   * @returns {string}
   */
  toString() {
    //return source;
    return _sourceRuleToString(this.source);
  }
};


export default ODataFilterBuilder;