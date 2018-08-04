function isString(value): boolean {
  return typeof value === 'string';
}

function isDate(value): boolean {
  return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
}

function normaliseValue(value): string {
  if (isString(value)) {
    return `'${value}'`;
  }

  if (isDate(value)) {
    return value.toISOString();
  }

  return String(value);
}

export default normaliseValue;