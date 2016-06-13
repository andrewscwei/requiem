// (c) Andrew Wei

'use strict';

import assertType from './assertType';

/**
 * Checks if an object literal has the specified value in one of its keys.
 *
 * @param {Object} object - Target object literal.
 * @param {*} value - Value to check.
 *
 * @return {boolean} True if value is found, false otherwise.
 *
 * @alias module:requiem~helpers.hasOwnValue
 */
function hasOwnValue(object, value) {
  assertType(object, 'object', false, 'Invalid object specified');

  for (let k in object) {
    if (object.hasOwnProperty(k) && (object[k] === value)) return true;
  }

  return false;
}

export default hasOwnValue;
