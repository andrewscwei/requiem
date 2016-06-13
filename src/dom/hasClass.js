// (c) Andrew Wei

'use strict';

import getClassIndex from './getClassIndex';
import assert from '../helpers/assert';

/**
 * Verifies that the specified element(s) has the specified class.
 *
 * @param {Node|Node[]} element - Target element(s).
 * @param {string} className - Class to check.
 *
 * @return {boolean} True if element(s) has given class, false otherwise.
 *
 * @alias module:requiem~dom.hasClass
 */
function hasClass(element, className) {
  if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return false;

  let elements = [].concat(element);
  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];
    if (getClassIndex(e, className) < 0) return false;
  }

  return true;
}

export default hasClass;
