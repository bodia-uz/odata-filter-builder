import * as canonicalFunctions from './canonicalFunctions';

import { IInputField } from '../types';

function inputFieldToString(field: IInputField): string {
  return typeof field === 'function' ? field(canonicalFunctions) : field;
}

export default inputFieldToString;