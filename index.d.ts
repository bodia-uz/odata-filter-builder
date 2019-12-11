/**
 * The comparison field lambda expression
 * @example
 * f()
 *  .and(x => x.eq('Type/Id', 1))
 *  .and(x => x.contains('Name', 'a'))
 *  .toString();
 * // (Type/Id eq 1) and (contains(Name, 'a'))
 */
type InputFieldExpression = (x: ODataFilterBuilderFunctions) => string;

/**
 * The comparison rule lambda expression
 * @example
 * f()
 *  .and(x => x.eq('Type/Id', 1))
 *  .and(x => x.contains('Name', 'a'))
 *  .toString();
 * // (Type/Id eq 1) and (contains(Name, 'a'))
 */
type InputRuleExpression = (x: ODataFilterBuilder) => ODataFilterBuilder;

/**
 * Canonical Functions
 */
interface ODataFilterBuilderFunctions {
    /**
     * The length function returns the number of characters in the parameter value.
     */
    length(field: string | InputFieldExpression): string;

    /**
     * The tolower function returns the input parameter string value with all uppercase characters converted to lowercase.
     */
    toLower(field: string | InputFieldExpression): string;

    /**
     * The toupper function returns the input parameter string value with all lowercase characters converted to uppercase.
     */
    toUpper(field: string | InputFieldExpression): string;

    /**
     * The trim function returns the input parameter string value with all leading and trailing whitespace characters, removed.
     */
    trim(field: string | InputFieldExpression): string;

    /**
     * The indexof function returns the zero-based character position of the first occurrence of the second parameter value in the first parameter value.
     */
    indexOf(field: string | InputFieldExpression, value: string): string;

    substring(field: string | InputFieldExpression, value: number): string;
    substring(field: string | InputFieldExpression, value1: number, value2: number): string;

    /**
     * @param field - The first function parameter
     * @param value - The second function parameter
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     * @returns A function string
     */
    concat(field: string | InputFieldExpression, value: string, normaliseValue?: boolean): string;
}

/**
 * Creates a new {@link ODataFilterBuilder} instance.
 * Can be used without "new" operator.
 * @param [condition='and'] - base condition ('and' OR 'or').
 * @returns The {@link ODataFilterBuilder} instance.
 */
interface ODataFilterBuilder {
    /**
     * Logical And
     */
    and(rule: string | ODataFilterBuilder | InputRuleExpression): ODataFilterBuilder;

    /**
     * Logical Or
     */
    or(rule: string | ODataFilterBuilder | InputRuleExpression): ODataFilterBuilder;

    /**
     * Logical Negation
     */
    not(rule: string | ODataFilterBuilder | InputRuleExpression): ODataFilterBuilder;

    // Comparison

    /**
     * Equal
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    eq(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * Not Equal
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    ne(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * Greater Than
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    gt(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * Greater than or Equal
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    ge(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * Less Than
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    lt(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * Less than or Equal
     * @param field - Field to compare
     * @param value - A value to compare with
     * @param [normaliseValue=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    le(field: string | InputFieldExpression, value: any, normaliseValue?: boolean): ODataFilterBuilder;

    /**
     * @param field - Field to compare
     * @param values - Values to compare with
     * @param [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    in(field: string | InputFieldExpression, values: any[], normaliseValues?: boolean): ODataFilterBuilder;

    /**
     * @param objectValue - Object with property and value to compare all in "and" - Loops through property keys
     * @param [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    compareAll(objectValue: Record<string, any | any[]>, normaliseValues?: boolean): ODataFilterBuilder;

    /**
     * @param field - Field to compare
     * @param values - Values to compare with
     * @param [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
     */
    notIn(field: string | InputFieldExpression, values: any[], normaliseValues?: boolean): ODataFilterBuilder;

    // Canonical Functions

    /**
     * The contains function returns true if the second parameter string value is a substring of the first parameter string value.
     * @example
     * // return contains(CompanyName, 'Alfreds')
     * @param field - Field to compare
     * @param value - Value to compare
     */
    contains(field: string | InputFieldExpression, value: string): ODataFilterBuilder;

    /**
     * The startswith function returns true if the first parameter string value starts with the second parameter string value.
     * @example
     * // return startswith(CompanyName,'Alfr')
     * @param field - Field to compare
     * @param value - Value to compare
     */
    startsWith(field: string | InputFieldExpression, value: string): ODataFilterBuilder;

    /**
     * The endswith function returns true if the first parameter string value ends with the second parameter string value.
     * @example
     * // return endswith(CompanyName,'Futterkiste')
     * @param field - Field to compare
     * @param value - Value to compare
     */
    endsWith(field: string | InputFieldExpression, value: string): ODataFilterBuilder;

    /**
     * Custom function
     * @param functionName - Name of generated function
     * @param field - The first function parameter
     * @param values - The second function parameter
     * @param [normaliseValues=true] - Convert string "value" to "'value'" or not. (Convert by default)
     * @param [reverse=false] - Swap field and value params in output. (Don't swap by default)
     */
    fn(functionName: string, field: string | InputFieldExpression, values: string | number | Array<string | number>, normaliseValues?: boolean, reverse?: boolean): ODataFilterBuilder;

    /**
     * Check if filter is empty
     */
    isEmpty(): boolean

    /**
     * Convert filter builder instance to string
     */
    toString(): string
}

interface ODataFilterBuilderStatic {
    /**
     * Creates a new {@link ODataFilterBuilder} instance.
     * Can be used without "new" operator.
     *
     * @example
     * // use short name as alias
     * const f = ODataFilterBuilder;
     *
     * @example
     * // can be used without "new" operator
     * // default base condition is 'and'
     * f()
     *  .eq('TypeId', '1')
     *  .eq('SubType/Id', '1')
     *  .toString();
     * // returns `(TypeId eq '1') and (SubType/Id eq 1)`
     *
     * @example
     * // 'or' condition as base condition
     * f('or')
     *  .eq('TypeId', '1')
     *  .eq('SubType/Id', '1')
     *  .toString();
     * // returns `(TypeId eq '1') or (SubType/Id eq 1)`
     *
     * @param {string} [condition='and'] - base condition ('and' OR 'or').
     * @returns {ODataFilterBuilder} The {@link ODataFilterBuilder} instance.
     */
    (condition?: 'and'|'or'): ODataFilterBuilder;
    new (condition?: 'and'|'or'): ODataFilterBuilder;

    /**
     * Creates new {@link ODataFilterBuilder} instance with 'and' as base condition
     * @example
     * f.and()
     *  .eq('a', 1)
     *  .eq('b', 2)
     *  .toString();
     * // (a eq 1) and (b eq 2)
     */
    and(): ODataFilterBuilder;

    /**
     * Create new {@link ODataFilterBuilder} with 'or' as base condition
     * @example
     * f.or()
     *  .eq('a', 1)
     *  .eq('b', 2)
     *  .toString();
     * // (a eq 1) or (b eq 2)
     */
    or(): ODataFilterBuilder;

    functions: ODataFilterBuilderFunctions
}

/**
* ODataFilterBuilder is util to build
* {@link http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html#_Toc406398094|$filter part}
* for OData query options.
*
* @see {@link http://docs.oasis-open.org/odata/odata/v4.0/errata02/os/complete/part2-url-conventions/odata-v4.0-errata02-os-part2-url-conventions-complete.html|OData URL Conventions}
* for further information.
*/
declare var ODataFilterBuilder: ODataFilterBuilderStatic;

/**
 * Canonical Functions
 */
declare var canonicalFunctions: ODataFilterBuilderFunctions;

export {
    ODataFilterBuilder,
    canonicalFunctions
}

export default ODataFilterBuilder;

