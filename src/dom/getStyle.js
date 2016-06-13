// (c) Andrew Wei

'use strict';

import assertType from '../helpers/assertType';

/**
 * Gets the value of an inline CSS rule of a Node by its name.
 *
 * @param {Node} element - Target element.
 * @param {string} key - Name of the CSS rule in camelCase.
 * @param {boolean} [isComputed=false] - Specifies whether the styles are
 *                                       computed.
 * @param {boolean} [isolateUnits=false] - Specifies whether value and units are
 *                                         separated. This affects the return
 *                                         value type.
 *
 * @return {*} Value of the style. If isolateUnits is set to true, this will
 *             return an object containing both 'value' and 'unit' keys.
 *
 * @alias module:requiem~dom.getStyle
 */
function getStyle(element, key, isComputed, isolateUnits) {
  assertType(element, Node, false, 'Invalid element specified');
  if (typeof isComputed !== 'boolean') isComputed = false;
  if (typeof isolateUnits !== 'boolean') isolateUnits = false;

  let value = (isComputed) ? window.getComputedStyle(element, null).getPropertyValue(key) : element.style[key];
  let regex = new RegExp('^[+-]?[0-9]+.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)$', 'i');

  if (value === '') return (isolateUnits ? { value: null, unit: null } : null);
  if (!isNaN(Number(value))) return (isolateUnits ? { value: Number(value), unit: null } : Number(value));

  if (regex.test(value)) {
    if (isolateUnits) {
      if (value.charAt(value.length-1) === '%') return { value: Number(value.substr(0, value.length-1)), unit: value.slice(-1) };
      return { value: Number(value.substr(0, value.length-2)), unit: value.slice(-2) };
    }
    else {
      return value;
    }
  }

  return (isolateUnits ? { value: value, units: null } : value);
}

export default getStyle;
