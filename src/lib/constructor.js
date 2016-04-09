function ODataFilterBuilder(condition = 'and') {
  if (!(this instanceof ODataFilterBuilder)) {
    return new ODataFilterBuilder(condition);
  }

  this.condition = condition;
  this.source = {
    condition: condition,
    rules: []
  };
}

function isODataFilterBuilder(obj) {
  return obj instanceof ODataFilterBuilder;
}

export {
    ODataFilterBuilder,
    isODataFilterBuilder
};
