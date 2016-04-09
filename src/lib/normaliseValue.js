function normaliseValue(value) {
  return typeof value === 'string' ? `'${value}'` : value;
}

export default normaliseValue;