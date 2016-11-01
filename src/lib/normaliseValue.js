function isString(value) {
  return typeof value === 'string';
}

function isDate(value) {
  return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

function normaliseValue(value) {
  if (isString(value)) {
    return `'${value}'`;
  }

  if (isDate(value)) {
    return value.toISOString();
  }

  return value;
}

export default normaliseValue;