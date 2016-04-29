// (c) VARIANTE

'use strict';

/**
 * Verifies that a given is of the given type.
 *
 * @param {*} value - Any value.
 * @param {*} type  - Any class or string that describes a type.
 *
 * @return {boolean} True if validation passes, false otherwise.
 *
 * @alias module:requiem~helpers.checkType
 */
function checkType(value, type) {
  if (typeof type === 'string') {
    switch (type) {
      case 'string':
      case 'object':
      case 'number':
      case 'boolean':
      case 'function':
        return typeof value === type;
      case 'class':
        return typeof value === 'function';
      case 'array':
        return value.constructor === Array;
      default:
        return false;
    }
  }
  else {
    return value instanceof type;
  }
}

export default checkType;
