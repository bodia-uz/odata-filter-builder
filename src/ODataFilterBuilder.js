import { ODataFilterBuilder } from './lib/constructor';
import * as canonicalFunctions from './lib/canonicalFunctions';
import proto from './lib/prototype';

ODataFilterBuilder.and = () => new ODataFilterBuilder('and');
ODataFilterBuilder.or = () => new ODataFilterBuilder('or');

ODataFilterBuilder.functions = canonicalFunctions;
ODataFilterBuilder.prototype = proto;

export default ODataFilterBuilder;