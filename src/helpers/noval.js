// (c) Andrew Wei

'use strict';

import assertType from './assertType';

/**
 * Checks if a given value is equal to null. Option to specify recursion, which
 * would further evaluate inner elements, such as when an Array or Object is
 * specified.
 *
 * @param {*} value - Value to evaluate.
 * @param {boolean} [recursive=false] - Specifies whether to recursively
 *                                      evaluate the supplied value's inner
 *                                      values (i.e. an Array or Object).
 *
 * @return {boolean} True if null, false otherwise.
 *
 * @alias module:requiem~helpers.noval
 */
function noval(value, recursive) {
  assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

  if (recursive === undefined) recursive = false;

  if (value === undefined || value === null) {
    return true;
  }
  else if (typeof value === 'string') {
    return (value === '');
  }
  else if (recursive && (value instanceof Array)) {
    let n = value.length;

    for (let i = 0; i < n; i++) {
      if (!noval(value[i], true)) return false;
    }

    return true;
  }
  else if (recursive && (typeof value === 'object') && (value.constructor === Object)) {
    for (let p in value) {
      if (!noval(value[p], true)) return false;
    }

    return true;
  }
  else {
    return false;
  }
}

export default noval;
