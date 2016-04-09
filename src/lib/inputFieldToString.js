import * as canonicalFunctions from './canonicalFunctions';

function inputFieldToString(field) {
  return typeof field === 'function' ? field(canonicalFunctions) : field;
}

export default inputFieldToString;